"use client";

import clsx from "clsx";

export default function Spinner({ size = 24, className, label = "Loading" }) {
  return (
    <span
      role="status"
      aria-label={label}
      className={clsx("inline-block", className)}
      style={{ width: size, height: size }}
    >
      <span
        className="block h-full w-full animate-spin rounded-full border-2 border-border border-t-accent"
      />
    </span>
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-3">
      <div className="skeleton aspect-[2/3] w-full rounded-xl" />
      <div className="skeleton h-4 w-3/4 rounded" />
      <div className="skeleton h-3 w-1/3 rounded" />
    </div>
  );
}
