import { useEffect, useMemo, useRef } from "react";
import debounce from "just-debounce-it";

/**
 * Returns a stable debounced wrapper around `callback`.
 *   - identity only changes when `delay` changes (safe as an effect dep),
 *   - always invokes the latest `callback` (no stale closures),
 *   - auto-cancels pending calls on unmount.
 * The returned function exposes `.cancel()` from just-debounce-it.
 */
export function useDebouncedCallback(callback, delay = 300) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const debounced = useMemo(
    () => debounce((...args) => callbackRef.current?.(...args), delay),
    [delay],
  );

  useEffect(() => () => debounced.cancel?.(), [debounced]);

  return debounced;
}
