// Server-only OMDB client. Holds the API key (never shipped to the browser) and
// an in-process response cache shared across every user hitting this instance.
// Imported exclusively by route handlers under app/api — never by client code.

import { thumbnailUrl } from "./movies";

// Prefer server-only vars; fall back to the legacy NEXT_PUBLIC_* ones so the app
// keeps working before the hosting env is migrated. See perf plan, Phase 2.
const URL_PATH = process.env.URL_PATH ?? process.env.NEXT_PUBLIC_URL_PATH;
const API_KEY = process.env.API_KEY ?? process.env.NEXT_PUBLIC_API_KEY;
const OMDB_BASE = `${URL_PATH ?? ""}${API_KEY ?? ""}`;

export const isConfigured = Boolean(URL_PATH && API_KEY);

function assertConfigured() {
  if (!isConfigured) {
    throw new Error(
      "OMDB API is not configured. Set URL_PATH and API_KEY (or the legacy NEXT_PUBLIC_* equivalents).",
    );
  }
}

function buildUrl(extraParams = {}) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(extraParams)) {
    if (v == null || v === "" || v === "all") continue;
    params.set(k, v);
  }
  const qs = params.toString();
  return qs ? `${OMDB_BASE}&${qs}` : OMDB_BASE;
}

function mapMovie(m) {
  return {
    id: m.imdbID,
    title: m.Title,
    year: m.Year,
    poster: m.Poster === "N/A" ? null : m.Poster,
    type: m.Type,
  };
}

function mapDetail(json) {
  return {
    id: json.imdbID,
    title: json.Title,
    year: json.Year,
    poster: json.Poster === "N/A" ? null : json.Poster,
    plot: json.Plot === "N/A" ? null : json.Plot,
    genre: json.Genre === "N/A" ? null : json.Genre,
    director: json.Director === "N/A" ? null : json.Director,
    actors: json.Actors === "N/A" ? null : json.Actors,
    runtime: json.Runtime === "N/A" ? null : json.Runtime,
    rating: json.imdbRating === "N/A" ? null : json.imdbRating,
    rated: json.Rated === "N/A" ? null : json.Rated,
    type: json.Type,
  };
}

// --- Response cache + retry --------------------------------------------------
// Keyed purely by URL (OMDB calls are pure GETs). Living server-side, this cache
// is shared across all users on the instance, not per-tab as the old client one
// was — so a popular query hits OMDB once, then serves everyone from memory.

const CACHE_TTL = 60_000;
const CACHE_MAX = 300;
const MAX_RETRIES = 2;
const responseCache = new Map(); // url -> { ts, json }

function readCache(url) {
  const hit = responseCache.get(url);
  if (!hit) return undefined;
  if (Date.now() - hit.ts > CACHE_TTL) {
    responseCache.delete(url);
    return undefined;
  }
  responseCache.delete(url);
  responseCache.set(url, hit); // refresh recency (cheap LRU)
  return hit.json;
}

function writeCache(url, json) {
  // Cache stable answers (incl. "not found"); skip transient OMDB errors.
  if (
    json?.Response === "False" &&
    json.Error &&
    json.Error !== "Movie not found!"
  ) {
    return;
  }
  responseCache.set(url, { ts: Date.now(), json });
  if (responseCache.size > CACHE_MAX) {
    responseCache.delete(responseCache.keys().next().value);
  }
}

function abortError() {
  const e = new Error("Aborted");
  e.name = "AbortError";
  return e;
}

function backoff(attempt, signal) {
  const ms = 300 * 2 ** attempt; // 300ms, 600ms
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(abortError());
      },
      { once: true },
    );
  });
}

async function fetchOmdb(url, signal) {
  const cached = readCache(url);
  if (cached !== undefined) return cached;

  for (let attempt = 0; ; attempt++) {
    if (signal?.aborted) throw abortError();
    try {
      const response = await fetch(url, { signal });
      if (!response.ok) {
        if (response.status >= 500 && attempt < MAX_RETRIES) {
          await backoff(attempt, signal);
          continue;
        }
        throw new Error(`Request failed (${response.status}).`);
      }
      const json = await response.json();
      writeCache(url, json);
      return json;
    } catch (err) {
      if (err.name === "AbortError") throw err;
      if (attempt < MAX_RETRIES) {
        await backoff(attempt, signal);
        continue;
      }
      throw new Error("Upstream OMDB request failed.");
    }
  }
}

// --- Poster pre-validation (opt-in) ------------------------------------------
// Confirm posters exist server-side so the grid never has to remove a broken
// card on scroll. Fail-open (only a definitive 404/410 nulls a poster) and
// concurrency- + timeout-bounded so it can't stall the response. Amortized by
// the response cache above, so it's paid once per unique query, not per user.

const VALIDATE_CONCURRENCY = 8;
const VALIDATE_TIMEOUT = 2000; // per-poster HEAD
const VALIDATE_BUDGET = 2000; // hard cap on total added latency

async function isPosterAlive(url, signal) {
  const ctrl = new AbortController();
  const onAbort = () => ctrl.abort();
  signal?.addEventListener("abort", onAbort, { once: true });
  const timer = setTimeout(() => ctrl.abort(), VALIDATE_TIMEOUT);
  try {
    const res = await fetch(url, { method: "HEAD", signal: ctrl.signal });
    return !(res.status === 404 || res.status === 410);
  } catch {
    return true; // network/timeout/HEAD-unsupported → keep the poster
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

async function nullifyBrokenPosters(movies, signal) {
  const withPoster = movies.filter((m) => m.poster);
  if (withPoster.length === 0) return movies;

  const broken = new Set();
  let cursor = 0;
  let expired = false;
  async function worker() {
    while (cursor < withPoster.length && !expired) {
      const m = withPoster[cursor++];
      // Probe the cheap downscaled variant, not the full poster.
      const alive = await isPosterAlive(thumbnailUrl(m.poster, 120), signal);
      if (!alive) broken.add(m.id);
    }
  }
  const workers = Promise.all(
    Array.from(
      { length: Math.min(VALIDATE_CONCURRENCY, withPoster.length) },
      worker,
    ),
  );
  // Whichever finishes first wins; on budget expiry we ship what we have and
  // keep the unverified posters (fail-open) rather than make the user wait.
  await Promise.race([
    workers,
    new Promise((resolve) =>
      setTimeout(() => ((expired = true), resolve()), VALIDATE_BUDGET),
    ),
  ]);

  if (broken.size === 0) return movies;
  return movies.map((m) => (broken.has(m.id) ? { ...m, poster: null } : m));
}

// --- Public operations -------------------------------------------------------

export async function omdbSearch({
  query,
  page = 1,
  type,
  year,
  validate = false,
  signal,
} = {}) {
  if (!query) return { movies: [], totalResults: 0 };
  assertConfigured();

  const url = buildUrl({ s: query, page, type, y: year });
  const json = await fetchOmdb(url, signal);

  if (json?.Response === "False") {
    if (json.Error === "Movie not found!")
      return { movies: [], totalResults: 0 };
    throw new Error(json.Error || "Could not load results.");
  }

  let movies = (json?.Search ?? []).map(mapMovie);
  const totalResults = Number(json?.totalResults) || movies.length;
  if (validate) movies = await nullifyBrokenPosters(movies, signal);
  return { movies, totalResults };
}

export async function omdbDetail({ id, signal } = {}) {
  if (!id) return null;
  assertConfigured();

  const url = buildUrl({ i: id, plot: "full" });
  const json = await fetchOmdb(url, signal);
  if (json?.Response === "False") throw new Error(json.Error || "Not found");
  return mapDetail(json);
}

export async function omdbDetailsBatch({ ids = [], signal } = {}) {
  const unique = [...new Set(ids.filter(Boolean))].slice(0, 20);
  if (unique.length === 0) return [];
  // Each detail call shares the response cache, so overlapping batches are cheap.
  const results = await Promise.all(
    unique.map((id) => omdbDetail({ id, signal }).catch(() => null)),
  );
  return results.filter(Boolean);
}
