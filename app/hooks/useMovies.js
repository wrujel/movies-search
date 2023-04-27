import { useState } from "react";
import { searchMovies } from "../services/searchMovies";

export function useMovies({ query }) {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const response = await searchMovies({ query });
    setMovies(response);
  };

  return { movies, getMovies };
}
