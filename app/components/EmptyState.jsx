"use client";

import { motion } from "framer-motion";
import { Film, SearchX, AlertTriangle } from "lucide-react";

const SUGGESTIONS = ["Inception", "Dune", "Interstellar", "Parasite", "Spirited Away"];

export default function EmptyState({ variant = "idle", error, onSuggestionClick }) {
  const config = {
    idle: {
      Icon: Film,
      title: "Find something to watch",
      subtitle:
        "Search by title, director, or actor. Try one of these to get started:",
      showSuggestions: true,
    },
    "no-results": {
      Icon: SearchX,
      title: "No matches found",
      subtitle: "Try different keywords or check the spelling.",
      showSuggestions: true,
    },
    "no-matches": {
      Icon: SearchX,
      title: "No items match your filters",
      subtitle: "Try clearing a filter or widening your year range.",
      showSuggestions: false,
    },
    error: {
      Icon: AlertTriangle,
      title: "Something went wrong",
      subtitle: error || "Please try again in a moment.",
      showSuggestions: false,
    },
  }[variant];

  const Icon = config.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex max-w-md flex-col items-center text-center py-16"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 -z-10 rounded-full bg-accent/20 blur-2xl" />
        <div className="grid h-20 w-20 place-items-center rounded-2xl glass">
          <Icon className="h-9 w-9 text-accent" aria-hidden />
        </div>
      </div>
      <h2 className="font-display text-2xl font-semibold mb-2">{config.title}</h2>
      <p className="text-text-muted mb-6">{config.subtitle}</p>
      {config.showSuggestions && (
        <div className="flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSuggestionClick?.(s)}
              className="rounded-full border border-border bg-surface-2 px-3.5 py-1.5 text-sm text-text-muted transition-colors hover:text-text hover:border-accent hover:bg-accent/10"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
