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
  // Point the ref at the latest callback without re-creating the debounced
  // wrapper. Updated in an effect (after commit), never during render.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debounced = useMemo(
    // callbackRef is read when the debounced fn *fires* (well after render),
    // not while this memo computes — safe despite the rule's static heuristic.
    // eslint-disable-next-line react-hooks/refs
    () => debounce((...args) => callbackRef.current?.(...args), delay),
    [delay],
  );

  useEffect(() => () => debounced.cancel?.(), [debounced]);

  return debounced;
}
