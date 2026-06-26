"use client";

import { Combobox } from "@headlessui/react";
import { motion } from "framer-motion";
import { Clock, Search as SearchIcon, X } from "lucide-react";
import clsx from "clsx";

function HighlightedText({ text, query }) {
  const q = query?.trim();
  if (!q) return text;
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q.toLowerCase());
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="font-semibold text-text">
        {text.slice(idx, idx + q.length)}
      </span>
      {text.slice(idx + q.length)}
    </>
  );
}

export default function AutocompleteDropdown({
  items,
  loading,
  query = "",
  onRemoveRecent,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-0 right-0 top-full mt-2 z-30"
    >
      <Combobox.Options
        static
        className="glass border border-border rounded-2xl shadow-card overflow-hidden py-2"
      >
        {loading && items.length === 0 ? (
          <div className="px-4 py-3 space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-4 w-4 rounded skeleton" />
                <div className="h-3 w-2/5 rounded skeleton" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="px-4 py-3 text-sm text-text-muted">
            No suggestions
          </div>
        ) : (
          <ul role="listbox" className="max-h-[28rem] overflow-y-auto">
            {items.map((item, i) => (
              <Combobox.Option
                key={`${item.kind}:${item.value}`}
                value={item.value}
                as="li"
                className="list-none"
              >
                {({ active }) => (
                  <motion.div
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.02, duration: 0.12 }}
                    className={clsx(
                      "group relative flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors",
                      active
                        ? "bg-accent/10 text-text"
                        : "text-text hover:bg-surface-2"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="autocomplete-active-bar"
                        className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-accent"
                      />
                    )}
                    {item.kind === "recent" ? (
                      <Clock
                        className="h-4 w-4 shrink-0 text-text-muted"
                        aria-hidden
                      />
                    ) : (
                      <SearchIcon
                        className="h-4 w-4 shrink-0 text-text-muted"
                        aria-hidden
                      />
                    )}
                    <span className="flex-1 truncate text-sm">
                      <HighlightedText text={item.value} query={query} />
                    </span>
                    {item.kind === "recent" && onRemoveRecent && (
                      <button
                        type="button"
                        aria-label={`Remove ${item.value} from recent searches`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onRemoveRecent(item.value);
                        }}
                        className="opacity-0 group-hover:opacity-100 focus:opacity-100 grid h-6 w-6 place-items-center rounded-full text-text-muted hover:text-text hover:bg-surface-2 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </motion.div>
                )}
              </Combobox.Option>
            ))}
          </ul>
        )}
      </Combobox.Options>
    </motion.div>
  );
}
