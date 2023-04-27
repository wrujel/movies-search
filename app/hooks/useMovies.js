import { useRef, useState } from "react";
import { searchMovies } from "../services/searchMovies";

export function useMovies({ query }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const previousSearch = useRef(query);

  const getMovies = async () => {
    if (query === previousSearch.current) return;

    try {
      setLoading(true);
      previousSearch.current = query;
      const response = await searchMovies({ query });
      setMovies(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, getMovies };
}
