import { useCallback, useEffect, useRef, useState } from "react";

function read(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * Generic, SSR-safe localStorage state. Mirrors the `useState` API
 * (`[value, setValue]`, setter accepts a value or an updater fn) and adds:
 *   - lazy hydration after mount (no SSR/client markup mismatch),
 *   - writes only on explicit updates (never wipes storage on first render),
 *   - cross-tab synchronisation via the `storage` event.
 */
export function useLocalStorage(key, initialValue) {
  // Capture the initial value once so effects can depend on `key` alone.
  const initialRef = useRef(initialValue);
  const [value, setValue] = useState(initialRef.current);
  const valueRef = useRef(value);
  valueRef.current = value;

  // Hydrate from storage after mount (client only).
  useEffect(() => {
    const stored = read(key, undefined);
    if (stored !== undefined) {
      valueRef.current = stored;
      setValue(stored);
    }
  }, [key]);

  const set = useCallback(
    (updater) => {
      const next =
        typeof updater === "function" ? updater(valueRef.current) : updater;
      valueRef.current = next;
      setValue(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // ignore quota / private-mode errors
      }
    },
    [key],
  );

  // Keep other tabs in sync.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== key) return;
      const stored = read(key, initialRef.current);
      valueRef.current = stored;
      setValue(stored);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  return [value, set];
}
