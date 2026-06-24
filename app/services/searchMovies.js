// Thin client over our own /api routes. The OMDB key now lives server-side
// (app/lib/omdb.js); this layer only adds a short client cache, abort support
// and light retry so autocomplete, the debounced search and an explicit submit
// for the same query share work instead of each hitting the network.

const CACHE_TTL = 60_000;
const CACHE_MAX = 100;
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

async function getJson(url, signal) {
  const cached = readCache(url);
  if (cached !== undefined) return cached;

  for (let attempt = 0; ; attempt++) {
    if (signal?.aborted) throw abortError();
    try {
      const res = await fetch(url, { signal });
      if (!res.ok) {
        // Retry our own 5xx (covers upstream 502s); surface 4xx immediately.
        if (res.status >= 500 && attempt < MAX_RETRIES) {
          await backoff(attempt, signal);
          continue;
        }
        let message = `Request failed (${res.status}).`;
        try {
          const body = await res.json();
          if (body?.error) message = body.error;
        } catch {
          // non-JSON error body — keep the generic message
        }
        throw new Error(message);
      }
      const json = await res.json();
      writeCache(url, json);
      return json;
    } catch (err) {
      if (err.name === "AbortError") throw err;
      if (attempt < MAX_RETRIES) {
        await backoff(attempt, signal);
        continue;
      }
      throw new Error("Network error. Check your connection and try again.");
    }
  }
}

export const searchMovies = async ({
  query,
  page = 1,
  type,
  year,
  validate = false,
  signal,
} = {}) => {
  if (!query) return { movies: [], totalResults: 0 };

  const params = new URLSearchParams({ query, page: String(page) });
  if (type && type !== "all") params.set("type", type);
  if (year) params.set("year", String(year));
  if (validate) params.set("validate", "1");

  const json = await getJson(`/api/search?${params.toString()}`, signal);
  return {
    movies: json.movies ?? [],
    totalResults: json.totalResults ?? 0,
  };
};

export const getMovieDetail = async ({ id, signal } = {}) => {
  if (!id) return null;
  return getJson(`/api/movie/${encodeURIComponent(id)}`, signal);
};

export const getMovieDetails = async ({ ids = [], signal } = {}) => {
  const list = ids.filter(Boolean);
  if (list.length === 0) return [];
  const params = new URLSearchParams({ ids: list.join(",") });
  const json = await getJson(`/api/movies?${params.toString()}`, signal);
  return json.movies ?? [];
};
