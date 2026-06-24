"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  Calendar,
  Check,
  ChevronDown,
  Clapperboard,
  Eraser,
  Film,
  Image as ImageIcon,
  LayoutGrid,
  SlidersHorizontal,
  Tv,
  X,
} from "lucide-react";
import clsx from "clsx";

import { YearRangeInput } from "./YearRangePicker";
import { useDismiss } from "../hooks/useDismiss";

const TYPE_OPTIONS = [
  { value: "all", label: "All", Icon: LayoutGrid },
  { value: "movie", label: "Movies", Icon: Film },
  { value: "series", label: "Series", Icon: Tv },
  { value: "episode", label: "Episodes", Icon: Clapperboard },
];

const SORT_OPTIONS = [
  { value: "off", label: "None", Icon: ArrowDownUp },
  { value: "desc", label: "Newest first", Icon: ArrowDown },
  { value: "asc", label: "Oldest first", Icon: ArrowUp },
];

const YEAR_PRESETS = [
  { label: "All years", range: [null, null] },
  { label: "2020s", range: [2020, 2029] },
  { label: "2010s", range: [2010, 2019] },
  { label: "2000s", range: [2000, 2009] },
  { label: "90s", range: [1990, 1999] },
  { label: "80s", range: [1980, 1989] },
];

export default function FilterBar({
  sort,
  onSortChange,
  yearRange,
  onYearRangeChange,
  type = "all",
  onTypeChange,
  includeNoPoster = false,
  onIncludeNoPosterChange,
}) {
  const [from, to] = yearRange;
  const hasRange = from != null || to != null;
  const hasFilters =
    hasRange || sort !== "off" || type !== "all" || includeNoPoster;

  const activeCount =
    (type !== "all" ? 1 : 0) +
    (sort !== "off" ? 1 : 0) +
    (hasRange ? 1 : 0) +
    (includeNoPoster ? 1 : 0);

  const typeLabel = TYPE_OPTIONS.find((t) => t.value === type)?.label ?? "All";
  const sortLabel = SORT_OPTIONS.find((s) => s.value === sort)?.label ?? "None";

  const activePreset = YEAR_PRESETS.find(
    (p) =>
      p.range[0] === from &&
      p.range[1] === to &&
      (p.range[0] != null || p.range[1] != null),
  );
  const yearLabel = (() => {
    if (activePreset) return activePreset.label;
    if (from != null && to != null) return `${from}–${to}`;
    if (from != null) return `From ${from}`;
    if (to != null) return `Until ${to}`;
    return "Any";
  })();

  const clearAll = () => {
    onYearRangeChange([null, null]);
    onSortChange?.("off");
    onTypeChange?.("all");
    onIncludeNoPosterChange?.(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-3xl"
      aria-label="Search filters"
    >
      <div className="rounded-2xl glass shadow-card px-3 py-2.5 sm:px-4 sm:py-3">
        {/* Toolbar */}
        <div className="flex items-start gap-2 w-full">
          {/* Wrapping filter chips */}
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
            <div className="flex items-center gap-1.5 pr-1 mr-1 border-r border-border/50">
              <SlidersHorizontal className="h-4 w-4 text-accent" aria-hidden />
              <span className="font-display text-[13px] font-semibold tracking-tight-2">
                Filters
              </span>
              {activeCount > 0 && (
                <span className="ml-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-bold tabular-nums">
                  {activeCount}
                </span>
              )}
            </div>

            <FilterDropdown
              icon={ArrowDownUp}
              label="Sort"
              value={sortLabel}
              active={sort !== "off"}
            >
              <OptionList
                options={SORT_OPTIONS}
                value={sort}
                onChange={onSortChange}
              />
            </FilterDropdown>

            <FilterDropdown
              icon={Calendar}
              label="Year"
              value={yearLabel}
              active={hasRange}
              width={296}
            >
              <YearPanel
                from={from}
                to={to}
                onChange={onYearRangeChange}
                activePresetLabel={activePreset?.label}
              />
            </FilterDropdown>

            <FilterDropdown
              icon={Film}
              label="Type"
              value={typeLabel}
              active={type !== "all"}
            >
              <OptionList
                options={TYPE_OPTIONS}
                value={type}
                onChange={onTypeChange}
              />
            </FilterDropdown>

            <ToggleButton
              icon={ImageIcon}
              active={includeNoPoster}
              onClick={() => onIncludeNoPosterChange?.(!includeNoPoster)}
            >
              No-poster
            </ToggleButton>
          </div>

          {/* Clear button — outside the wrap zone so it stays top-right */}
          <AnimatePresence initial={false}>
            {hasFilters && (
              <motion.button
                key="clear"
                type="button"
                onClick={clearAll}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.15 }}
                className="shrink-0 inline-flex items-center gap-1 rounded-full bg-danger/10 hover:bg-danger/20 text-danger px-2.5 py-1.5 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/60"
                aria-label="Clear all filters"
              >
                <Eraser className="h-3.5 w-3.5" />
                Clear
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function FilterDropdown({
  icon: Icon,
  label,
  value,
  active = false,
  width = 220,
  children,
}) {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={clsx(
          "group inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          active
            ? "border-accent/70 bg-accent/15 text-accent shadow-[0_0_0_1px_rgb(var(--color-accent)/0.25)]"
            : "border-border/60 bg-surface-2/40 text-text hover:border-border hover:bg-surface-2",
        )}
      >
        <Icon
          className={clsx(
            "h-3.5 w-3.5 shrink-0",
            active ? "text-accent" : "text-text-muted",
          )}
          aria-hidden
        />
        <span className={clsx("text-text-muted", active && "text-accent/80")}>
          {label}
        </span>
        <span className="font-semibold tracking-tight-2 truncate max-w-[140px]">
          {value}
        </span>
        <ChevronDown
          className={clsx(
            "h-3 w-3 shrink-0 text-text-muted transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            style={{ width }}
            className="absolute left-0 top-full mt-2 z-40 rounded-xl glass border border-border/70 p-1.5 shadow-card"
            role="dialog"
            aria-label={`${label} filter`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OptionList({ options, value, onChange }) {
  return (
    <ul role="listbox" className="flex flex-col">
      {options.map((opt) => {
        const selected = opt.value === value;
        const Icon = opt.Icon;
        return (
          <li key={opt.value}>
            <button
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => onChange?.(opt.value)}
              className={clsx(
                "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                selected
                  ? "bg-accent/15 text-accent font-semibold"
                  : "text-text hover:bg-surface-2",
              )}
            >
              {Icon && (
                <Icon
                  className={clsx(
                    "h-4 w-4 shrink-0",
                    selected ? "text-accent" : "text-text-muted",
                  )}
                  aria-hidden
                />
              )}
              <span className="flex-1 text-left tracking-tight-2">
                {opt.label}
              </span>
              {selected && (
                <Check
                  className="h-4 w-4 text-accent shrink-0"
                  strokeWidth={3}
                  aria-hidden
                />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function YearPanel({ from, to, onChange, activePresetLabel }) {
  const setFrom = (v) => onChange([v, to]);
  const setTo = (v) => onChange([from, v]);
  const hasRange = from != null || to != null;

  return (
    <div className="flex flex-col gap-2 p-1.5">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted/80">
          Quick picks
        </span>
        {hasRange && (
          <button
            type="button"
            onClick={() => onChange([null, null])}
            className="text-[11px] text-text-muted hover:text-danger transition-colors flex items-center gap-1"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        )}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {YEAR_PRESETS.map((p) => {
          const isAll = p.range[0] == null && p.range[1] == null;
          const active = isAll ? !hasRange : activePresetLabel === p.label;
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => onChange(p.range)}
              aria-pressed={active}
              className={clsx(
                "rounded-lg py-1.5 text-[12px] font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                active
                  ? "bg-accent/15 text-accent ring-1 ring-accent/40"
                  : "bg-surface-2/60 text-text-muted hover:text-text hover:bg-surface-2",
              )}
            >
              {p.label}
            </button>
          );
        })}
      </div>
      <div className="mt-1 pt-2 border-t border-border/40">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted/80 px-1">
          Custom range
        </span>
        <div className="mt-1.5">
          <YearRangeInput
            from={from}
            to={to}
            onFromChange={setFrom}
            onToChange={setTo}
          />
        </div>
      </div>
    </div>
  );
}

function ToggleButton({ icon: Icon, active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        active
          ? "border-accent/70 bg-accent/15 text-accent shadow-[0_0_0_1px_rgb(var(--color-accent)/0.25)]"
          : "border-border/60 bg-surface-2/40 text-text-muted hover:text-text hover:border-border hover:bg-surface-2",
      )}
    >
      <Icon
        className={clsx(
          "h-3.5 w-3.5",
          active ? "text-accent" : "text-text-muted",
        )}
        aria-hidden
      />
      <span className="tracking-tight-2">{children}</span>
    </button>
  );
}
