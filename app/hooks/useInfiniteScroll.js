import { useCallback, useEffect, useRef } from "react";

export function useInfiniteScroll({
  onLoadMore,
  enabled = true,
  rootMargin = "400px",
}) {
  const callbackRef = useRef(onLoadMore);
  const observerRef = useRef(null);
  const nodeRef = useRef(null);

  useEffect(() => {
    callbackRef.current = onLoadMore;
  }, [onLoadMore]);

  const attach = useCallback(
    (node) => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      nodeRef.current = node;
      if (!node || !enabled) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) callbackRef.current?.();
        },
        { rootMargin }
      );
      observer.observe(node);
      observerRef.current = observer;
    },
    [enabled, rootMargin]
  );

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return attach;
}
