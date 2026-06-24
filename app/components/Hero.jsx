"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Film } from "lucide-react";

export default function Hero({ collapsed = false }) {
  return (
    <div
      className={`text-center transition-[padding] duration-500 ease-out ${
        collapsed ? "pt-6 pb-2" : "pt-16 pb-8"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-text-muted mb-6"
      >
        <Sparkles className="h-3.5 w-3.5 text-accent" />
        Powered by OMDB
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: collapsed ? 0.78 : 1,
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.05 },
          y: { duration: 0.6, delay: 0.05 },
          scale: { type: "spring", stiffness: 220, damping: 26 },
        }}
        style={{ transformOrigin: "top center" }}
        className="font-display font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl will-change-transform"
      >
        Discover your next{" "}
        <span className="text-gradient inline-flex items-center gap-2">
          favourite
          <Film
            className="h-10 w-10 sm:h-12 sm:w-12 text-accent-2"
            aria-hidden
          />
        </span>
      </motion.h1>

      <AnimatePresence>
        {!collapsed && (
          <motion.p
            key="subtitle"
            initial={{ opacity: 0, y: 12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <span className="block mt-5 mx-auto max-w-xl text-base sm:text-lg text-text-muted">
              Search millions of films and TV shows. Filter by year, save favourites, and dive into details — all in one place.
            </span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
