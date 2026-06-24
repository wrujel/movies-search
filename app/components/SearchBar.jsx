"use client";

import { useMemo, useState } from "react";
import { Combobox } from "@headlessui/react";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

import AutocompleteDropdown from "./AutocompleteDropdown";
import { useDismiss } from "../hooks/useDismiss";

const MAX_DROPDOWN_ITEMS = 8;

export default function SearchBar({
  value,
  onChange,
  onClear,
  error,
  autoFocus = true,
  suggestions = [],
  recents = [],
  loadingSuggestions = false,
  onSelect,
  onRemoveRecent,
}) {
  const [focused, setFocused] = useState(false);
  const containerRef = useDismiss(focused, () => setFocused(false));

  const items = useMemo(() => {
    const q = value.trim().toLowerCase();
    const filteredRecents = (
      q ? recents.filter((r) => r.toLowerCase().includes(q)) : recents
    ).filter((r) => r.toLowerCase() !== q);

    const recentSet = new Set(filteredRecents.map((r) => r.toLowerCase()));
    const dedupedSuggestions = suggestions.filter(
      (s) => !recentSet.has(s.toLowerCase()) && s.toLowerCase() !== q,
    );

    return [
      ...filteredRecents.map((r) => ({ kind: "recent", value: r })),
      ...dedupedSuggestions.map((s) => ({ kind: "suggestion", value: s })),
    ].slice(0, MAX_DROPDOWN_ITEMS);
  }, [value, recents, suggestions]);

  const hasItems = items.length > 0 || loadingSuggestions;

  const handleSelect = (selected) => {
    if (typeof selected === "string" && onSelect) onSelect(selected);
    setFocused(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl"
    >
      <Combobox value={null} onChange={handleSelect} nullable>
        <div ref={containerRef} className="relative">
          <div
            className={clsx(
              "group relative flex items-center rounded-full glass shadow-card transition-shadow duration-300",
              "focus-within:shadow-glow",
            )}
          >
            <Search
              className="absolute left-5 h-5 w-5 text-text-muted transition-colors group-focus-within:text-accent"
              aria-hidden
            />
            <Combobox.Input
              value={value}
              onChange={onChange}
              displayValue={() => value}
              autoFocus={autoFocus}
              aria-label="Search for movies"
              placeholder="Search films, shows, or names…"
              autoComplete="off"
              onFocus={() => setFocused(true)}
              className="w-full bg-transparent border-0 py-4 pl-14 pr-12 text-base text-text placeholder:text-text-muted/70 focus:outline-none focus:ring-0"
            />
            {value && (
              <motion.button
                type="button"
                onClick={onClear}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Clear search"
                className="absolute right-4 grid h-8 w-8 place-items-center rounded-full text-text-muted hover:text-text hover:bg-surface-2 transition-colors z-10"
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </div>

          <AnimatePresence>
            {focused && hasItems && !error && (
              <AutocompleteDropdown
                items={items}
                loading={loadingSuggestions}
                query={value}
                onRemoveRecent={onRemoveRecent}
              />
            )}
          </AnimatePresence>
        </div>
      </Combobox>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-danger pl-5"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}
