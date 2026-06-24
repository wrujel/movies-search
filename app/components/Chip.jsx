"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import clsx from "clsx";

export function SelectChip({
  selected,
  onClick,
  icon: Icon,
  label,
  disabled = false,
  size = "md",
}) {
  const sizing =
    size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-xs";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={clsx(
        "relative inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        sizing,
        selected
          ? "border-accent bg-accent/15 text-accent"
          : "border-border/70 bg-transparent text-text-muted hover:text-text hover:border-border",
        disabled && "opacity-60 cursor-not-allowed"
      )}
    >
      <AnimatePresence initial={false}>
        {selected && (
          <motion.span
            key="check"
            initial={{ scale: 0.4, opacity: 0, width: 0, marginRight: 0 }}
            animate={{ scale: 1, opacity: 1, width: "auto", marginRight: 0 }}
            exit={{ scale: 0.4, opacity: 0, width: 0, marginRight: 0 }}
            transition={{ duration: 0.14 }}
            className="inline-flex items-center"
            aria-hidden
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </motion.span>
        )}
      </AnimatePresence>
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />}
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

export function RemovableChip({ label, onRemove, icon: Icon }) {
  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.15 }}
      className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-surface-2/60 pl-3 pr-1 py-1 text-xs text-text"
    >
      {Icon && <Icon className="h-3 w-3 text-text-muted" aria-hidden />}
      <span className="whitespace-nowrap">{label}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="ml-0.5 grid h-5 w-5 place-items-center rounded-full text-text-muted hover:text-danger hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        <X className="h-3 w-3" />
      </button>
    </motion.span>
  );
}
