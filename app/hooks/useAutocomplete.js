import { useEffect, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/searchMovies";
import { isValidQuery } from "../lib/query";
import { buildCompletions } from "../lib/completions";
import { useDebouncedCallback } from "./useDebouncedCallback";

export function useAutocomplete({
  query,
  type = "all",
  year = null,
  limit = 6,
}) {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const fetchSuggestions = useDebouncedCallback(async (q, t, y) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);
      const { movies } = await searchMovies({
        query: q,
        page: 1,
        type: t,
        year: y,
        signal: controller.signal,
      });
      setTitles(movies.map((m) => m.title).filter(Boolean));
    } catch (err) {
      if (err.name !== "AbortError") setTitles([]);
    } finally {
      setLoading(false);
    }
  }, 200);

  useEffect(() => {
    if (!isValidQuery(query)) {
      fetchSuggestions.cancel?.();
      abortRef.current?.abort();
      setTitles([]);
      setLoading(false);
      return;
    }
    fetchSuggestions(query, type, year);
  }, [query, type, year, fetchSuggestions]);

  const suggestions = useMemo(
    () => buildCompletions(query, titles, limit),
    [query, titles, limit],
  );

  return { suggestions, loading };
}
