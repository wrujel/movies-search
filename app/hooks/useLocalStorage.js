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
  // Capture the initial value once so the storage handler can fall back to it
  // without re-subscribing when the caller passes a fresh object each render.
  const initialRef = useRef(initialValue);
  const [value, setValue] = useState(initialValue);

  // Hydrate from storage after mount (client only). setState-in-effect is the
  // intended pattern here — reading localStorage during render breaks SSR.
  useEffect(() => {
    const stored = read(key, undefined);
    if (stored === undefined) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(stored);
  }, [key]);

  const set = useCallback(
    (updater) => {
      // Functional update gives us the latest value without a render-time ref.
      setValue((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // ignore quota / private-mode errors
        }
        return next;
      });
    },
    [key],
  );

  // Keep other tabs in sync.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== key) return;
      setValue(read(key, initialRef.current));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  return [value, set];
}
