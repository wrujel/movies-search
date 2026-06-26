"use client";

import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import MovieCard from "./MovieCard";

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

// Memoized so typing in the search box (which re-renders the page) doesn't
// re-run the whole grid until the movies array or a handler actually changes.
export const Movies = memo(function Movies({
  movies = [],
  onSelect,
  isFavorite,
  onFavoriteToggle,
  onPosterError,
  onPrefetch,
}) {
  if (!movies || movies.length === 0) return null;

  return (
    <motion.ul
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="grid w-full gap-5 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      {/* No `mode="popLayout"`: cards dropped the per-item `layout` animation
          (it forced a full-grid measure on every append), so plain exit
          transitions are all that's needed here. */}
      <AnimatePresence>
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onSelect={onSelect}
            isFavorite={isFavorite?.(movie.id)}
            onFavoriteToggle={onFavoriteToggle}
            onPosterError={onPosterError}
            onPrefetch={onPrefetch}
            // Eagerly load the first row (≤5 cols); the rest lazy-load on scroll,
            // which naturally caps how many posters fetch at once.
            priority={index < 5}
          />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
});
