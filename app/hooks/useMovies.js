import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/searchMovies";
import { normalizeYear, mergeSet } from "../lib/movies";
import toast from "react-hot-toast";

export function useMovies({
  query,
  sort,
  yearRange,
  type = "all",
  year = null,
  includeNoPoster = false,
}) {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  // Denylist of posters that failed to load. Posters are shown optimistically
  // and a card removes itself here (via markPosterBroken) only if its own image
  // 404s — no upfront probing, so nothing is fetched twice.
  const [brokenPosters, setBrokenPosters] = useState(() => new Set());

  const previousSearch = useRef(null);
  const pageRef = useRef(1);
  const abortRef = useRef(null);
  const loadMoreAbortRef = useRef(null);
  const filtersRef = useRef({ year, type });
  const pendingBrokenRef = useRef(new Set());
  const flushScheduledRef = useRef(false);

  const flushBrokenPosters = useCallback(() => {
    flushScheduledRef.current = false;
    const toBroken = pendingBrokenRef.current;
    if (toBroken.size === 0) return;
    pendingBrokenRef.current = new Set();
    setBrokenPosters((prev) => mergeSet(prev, toBroken));
  }, []);

  // Coalesce error events (e.g. several cards 404 at once after a page append)
  // into a single state update so the grid re-renders once, not per image.
  const markPosterBroken = useCallback(
    (id) => {
      if (!id) return;
      pendingBrokenRef.current.add(id);
      if (flushScheduledRef.current) return;
      flushScheduledRef.current = true;
      if (typeof window !== "undefined" && window.requestAnimationFrame) {
        window.requestAnimationFrame(flushBrokenPosters);
      } else {
        Promise.resolve().then(flushBrokenPosters);
      }
    },
    [flushBrokenPosters],
  );

  useEffect(() => {
    filtersRef.current = { year, type };
  }, [year, type]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      loadMoreAbortRef.current?.abort();
    };
  }, []);

  const getMovies = useCallback(
    async ({ query }) => {
      // type/year are part of the identity — switching them is a new search.
      const key = `${query}|${year ?? ""}|${type ?? "all"}`;
      if (key === previousSearch.current) return;

      abortRef.current?.abort();
      loadMoreAbortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        setLoading(true);
        setError(null);
        previousSearch.current = key;
        pageRef.current = 1;
        pendingBrokenRef.current = new Set();
        setBrokenPosters(new Set());

        const { movies: data, totalResults } = await searchMovies({
          query,
          page: 1,
          type,
          year,
          validate: true,
          signal: controller.signal,
        });

        const normalized = data.map((m) => ({
          ...m,
          yearNumber: normalizeYear(m.year),
        }));
        setMovies(normalized);
        setTotalResults(totalResults);
        return normalized;
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
        toast.error(err.message);
        setMovies([]);
        setTotalResults(0);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [year, type],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    loadMoreAbortRef.current?.abort();
    previousSearch.current = null;
    pageRef.current = 1;
    pendingBrokenRef.current = new Set();
    setMovies(null);
    setTotalResults(0);
    setError(null);
    setLoading(false);
    setLoadingMore(false);
    setBrokenPosters(new Set());
  }, []);

  const loadMore = useCallback(async () => {
    if (loading || loadingMore) return;
    const key = previousSearch.current;
    if (!key || movies == null) return;

    loadMoreAbortRef.current?.abort();
    const controller = new AbortController();
    loadMoreAbortRef.current = controller;

    const [storedQuery] = key.split("|");
    const { year: y, type: t } = filtersRef.current;

    try {
      setLoadingMore(true);
      const nextPage = pageRef.current + 1;
      const { movies: data } = await searchMovies({
        query: storedQuery,
        page: nextPage,
        type: t,
        year: y,
        validate: true,
        signal: controller.signal,
      });
      // Bail if a new search replaced this one while the request was in flight.
      if (previousSearch.current !== key) return;
      pageRef.current = nextPage;
      setMovies((prev) => {
        const seen = new Set((prev ?? []).map((m) => m.id));
        const fresh = data
          .filter((m) => !seen.has(m.id))
          .map((m) => ({ ...m, yearNumber: normalizeYear(m.year) }));
        return fresh.length ? [...(prev ?? []), ...fresh] : prev;
      });
    } catch (err) {
      if (err.name !== "AbortError") toast.error(err.message);
    } finally {
      setLoadingMore(false);
    }
  }, [loading, loadingMore, movies]);

  const visibleMovies = useMemo(() => {
    if (!movies) return null;
    let list = movies;
    // type is filtered server-side; only poster/year/sort apply locally.
    // Show posters optimistically; drop only the ones a card reported broken.
    if (!includeNoPoster) {
      list = list.filter((m) => m.poster && !brokenPosters.has(m.id));
    }
    if (yearRange && (yearRange[0] || yearRange[1])) {
      const [min, max] = yearRange;
      list = list.filter((m) => {
        if (m.yearNumber == null) return true;
        if (min && m.yearNumber < min) return false;
        if (max && m.yearNumber > max) return false;
        return true;
      });
    }
    if ((sort === "asc" || sort === "desc") && list.length > 0) {
      const dir = sort === "asc" ? 1 : -1;
      list = [...list].sort(
        (a, b) => ((a.yearNumber || 0) - (b.yearNumber || 0)) * dir,
      );
    }
    return list;
  }, [movies, sort, yearRange, includeNoPoster, brokenPosters]);

  const hasMore = movies != null && movies.length < totalResults;

  return {
    movies: visibleMovies,
    rawCount: movies?.length ?? 0,
    totalResults,
    loading,
    loadingMore,
    error,
    hasMore,
    getMovies,
    loadMore,
    reset,
    markPosterBroken,
  };
}
