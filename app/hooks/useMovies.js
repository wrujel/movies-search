import { useCallback, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/searchMovies";

export function useMovies({ query, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const previousSearch = useRef(query);

  const getMovies = useCallback(async ({ query }) => {
    if (query === previousSearch.current) return;

    try {
      setLoading(true);
      previousSearch.current = query;
      const response = await searchMovies({ query });
      setMovies(response);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return sort && movies?.length > 0
      ? [...movies].sort((a, b) => a.year - b.year)
      : movies;
  }, [movies, sort]);

  return { movies: sortedMovies, loading, getMovies };
}
