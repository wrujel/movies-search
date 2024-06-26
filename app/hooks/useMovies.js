import { useCallback, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/searchMovies";
import toast from "react-hot-toast";

export function useMovies({ query, sort }) {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const previousSearch = useRef(query);

  // This function fetches movies from the API and updates the state
  const getMovies = useCallback(async ({ query }) => {
    // If the search query is the same as the previous search, return.
    if (query === previousSearch.current) return;

    try {
      setLoading(true);
      previousSearch.current = query;
      const response = await searchMovies({ query });
      setMovies(response);
      return response;
    } catch (error) {
      toast.error(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // This function updates the year of the movie if it contains a range
  if (movies?.length > 0) {
    movies.forEach((movie) => {
      if (movie.year !== null && movie.year.includes("–")) {
        movie.year = movie.year.split("–")[0];
      }
    });
  }

  // sorts the movies by year if the sort flag is set
  const sortedMovies = useMemo(() => {
    return sort && movies?.length > 0
      ? [...movies].sort((a, b) => a.year - b.year)
      : movies;
  }, [movies, sort]);

  return { movies: sortedMovies, loading, getMovies };
}
