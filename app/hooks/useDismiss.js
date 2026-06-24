import { useEffect, useRef } from "react";

/**
 * Dismiss-on-outside-interaction helper. Attach the returned ref to the
 * element that should stay open; `onDismiss` fires on an outside pointer-down
 * or (optionally) the Escape key. Listeners are only bound while `active`.
 *
 *   const ref = useDismiss(open, () => setOpen(false));
 *   <div ref={ref}>…</div>
 */
export function useDismiss(active, onDismiss, { escape = true } = {}) {
  const ref = useRef(null);
  const handlerRef = useRef(onDismiss);
  handlerRef.current = onDismiss;

  useEffect(() => {
    if (!active) return;
    const onPointer = (e) => {
      if (ref.current && !ref.current.contains(e.target))
        handlerRef.current?.();
    };
    const onKey = (e) => {
      if (escape && e.key === "Escape") handlerRef.current?.();
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [active, escape]);

  return ref;
}
