import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "movies-search:favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage(STORAGE_KEY, {});

  const has = useCallback((id) => Boolean(favorites[id]), [favorites]);

  const toggle = useCallback(
    (movie) => {
      setFavorites((prev) => {
        const next = { ...prev };
        if (next[movie.id]) {
          delete next[movie.id];
        } else {
          next[movie.id] = {
            id: movie.id,
            title: movie.title,
            year: movie.year,
            poster: movie.poster,
          };
        }
        return next;
      });
    },
    [setFavorites],
  );

  return { favorites, has, toggle, count: Object.keys(favorites).length };
}
