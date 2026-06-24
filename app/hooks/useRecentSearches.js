import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "movies-search:recent";
const MAX_RECENTS = 8;

export function useRecentSearches() {
  const [recents, setRecents] = useLocalStorage(STORAGE_KEY, []);

  const add = useCallback(
    (term) => {
      const value = typeof term === "string" ? term.trim() : "";
      if (!value) return;
      setRecents((prev) => {
        const list = Array.isArray(prev) ? prev : [];
        const key = value.toLowerCase();
        return [value, ...list.filter((t) => t.toLowerCase() !== key)].slice(
          0,
          MAX_RECENTS,
        );
      });
    },
    [setRecents],
  );

  const remove = useCallback(
    (term) => {
      if (!term) return;
      const key = term.toLowerCase();
      setRecents((prev) =>
        (Array.isArray(prev) ? prev : []).filter(
          (t) => t.toLowerCase() !== key,
        ),
      );
    },
    [setRecents],
  );

  const clear = useCallback(() => setRecents([]), [setRecents]);

  return { recents, add, remove, clear };
}
