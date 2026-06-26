"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

import { useDismiss } from "../hooks/useDismiss";

export const YEAR_MIN = 1900;
export const YEAR_MAX = new Date().getFullYear();

export function YearRangeInput({
  from,
  to,
  onFromChange,
  onToChange,
  disabled = false,
}) {
  return (
    <div
      className={clsx(
        "inline-flex w-full items-center rounded-full bg-surface-2 border border-border",
        "transition-all duration-200 focus-within:border-accent focus-within:shadow-glow",
        "pl-3 pr-1 py-1",
        disabled && "opacity-60",
      )}
      role="group"
      aria-label="Filter by year range"
    >
      <Calendar className="h-4 w-4 text-text-muted shrink-0 mr-2" aria-hidden />
      <YearField
        label="From year"
        value={from}
        otherValue={to}
        bound="from"
        min={YEAR_MIN}
        max={YEAR_MAX}
        onChange={onFromChange}
        disabled={disabled}
      />
      <ArrowRight
        className="h-3.5 w-3.5 text-text-muted/60 mx-1 shrink-0"
        aria-hidden
      />
      <YearField
        label="To year"
        value={to}
        otherValue={from}
        bound="to"
        min={YEAR_MIN}
        max={YEAR_MAX}
        onChange={onToChange}
        disabled={disabled}
      />
    </div>
  );
}

function YearField({
  label,
  value,
  otherValue,
  bound,
  min,
  max,
  onChange,
  disabled,
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useDismiss(open, () => setOpen(false));

  const handleChange = (e) => {
    const raw = e.target.value;
    if (raw === "") {
      onChange(null);
      return;
    }
    const n = Number(raw);
    if (Number.isFinite(n)) onChange(n);
  };

  const handleBlur = (e) => {
    const raw = e.target.value;
    if (raw === "") return;
    const n = Number(raw);
    if (!Number.isFinite(n)) {
      onChange(null);
      return;
    }
    if (n < min) onChange(min);
    else if (n > max) onChange(max);
  };

  const effectiveMin =
    bound === "to" && otherValue != null ? Math.max(min, otherValue) : min;
  const effectiveMax =
    bound === "from" && otherValue != null ? Math.min(max, otherValue) : max;

  return (
    <div
      ref={containerRef}
      className="relative flex items-center flex-1 min-w-0"
    >
      <span className="sr-only">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value ?? ""}
        placeholder="Any"
        onChange={handleChange}
        onBlur={handleBlur}
        aria-label={label}
        disabled={disabled}
        className={clsx(
          "w-full bg-transparent border-0 px-1 py-1 text-sm text-text",
          "placeholder:text-text-muted/50 placeholder:italic focus:outline-none focus:ring-0",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          "tabular-nums text-center disabled:cursor-not-allowed",
        )}
      />
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        aria-label={`Open ${label} picker`}
        aria-expanded={open}
        disabled={disabled}
        className="grid h-6 w-6 place-items-center rounded-full text-text-muted hover:text-accent hover:bg-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronDown
          className={clsx(
            "h-3.5 w-3.5 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <YearPicker
            value={value}
            min={effectiveMin}
            max={effectiveMax}
            onSelect={(y) => {
              onChange(y);
              setOpen(false);
            }}
            onClear={() => {
              onChange(null);
              setOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function YearPicker({ value, min, max, onSelect, onClear }) {
  const today = new Date().getFullYear();
  const seed = value ?? Math.min(Math.max(today, min), max);
  const initialBase = Math.floor(seed / 10) * 10;
  const [base, setBase] = useState(initialBase);

  const years = Array.from({ length: 12 }, (_, i) => base - 1 + i);

  const canPrev = base - 10 + 9 >= min;
  const canNext = base + 10 <= max;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-56 rounded-xl glass border border-border p-3 shadow-card"
      role="dialog"
      aria-label="Year picker"
    >
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => canPrev && setBase((b) => b - 10)}
          disabled={!canPrev}
          aria-label="Previous decade"
          className="grid h-7 w-7 place-items-center rounded-md text-text-muted hover:bg-surface-2 hover:text-text transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-xs font-medium tabular-nums text-text-muted">
          {base} – {base + 9}
        </span>
        <button
          type="button"
          onClick={() => canNext && setBase((b) => b + 10)}
          disabled={!canNext}
          aria-label="Next decade"
          className="grid h-7 w-7 place-items-center rounded-md text-text-muted hover:bg-surface-2 hover:text-text transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {years.map((y) => {
          const inRange = y >= min && y <= max;
          const isCurrent = y === value;
          const isToday = y === today;
          const inDecade = y >= base && y < base + 10;
          return (
            <button
              key={y}
              type="button"
              onClick={() => inRange && onSelect(y)}
              disabled={!inRange}
              className={clsx(
                "relative rounded-md py-1.5 text-xs font-medium tabular-nums transition-colors",
                isCurrent
                  ? "bg-accent text-white shadow-glow"
                  : inDecade
                    ? "text-text hover:bg-surface-2"
                    : "text-text-muted/50 hover:bg-surface-2",
                !inRange &&
                  "opacity-30 cursor-not-allowed hover:bg-transparent",
                isToday && !isCurrent && "ring-1 ring-accent/40",
              )}
              aria-pressed={isCurrent}
            >
              {y}
            </button>
          );
        })}
      </div>

      {value != null && (
        <button
          type="button"
          onClick={onClear}
          className="mt-3 w-full rounded-md py-1.5 text-xs text-text-muted hover:text-danger hover:bg-surface-2 transition-colors"
        >
          Clear
        </button>
      )}
    </motion.div>
  );
}
