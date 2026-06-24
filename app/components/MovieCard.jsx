"use client";

import Image from "next/image";
import { forwardRef, memo, useState } from "react";
import { motion } from "framer-motion";
import { Heart, ImageOff } from "lucide-react";
import clsx from "clsx";
import { posterUrl, POSTER_BLUR } from "../lib/movies";

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const MovieCard = forwardRef(function MovieCard(
  {
    movie,
    onSelect,
    isFavorite,
    onFavoriteToggle,
    onPosterError,
    onPrefetch,
    priority = false,
  },
  ref,
) {
  const [imgError, setImgError] = useState(false);
  const showImage = movie.poster && !imgError;

  // Warm the detail cache on intent so opening the modal feels instant. The
  // service de-dupes via its cache, so repeated hovers cost nothing.
  const prefetch = () => onPrefetch?.(movie.id);

  return (
    <motion.li ref={ref} variants={cardVariants} className="list-none relative">
      <motion.button
        type="button"
        onClick={() => onSelect?.(movie)}
        onMouseEnter={prefetch}
        onFocus={prefetch}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "tween", duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="group relative block w-full text-left rounded-2xl overflow-hidden bg-surface-2 border border-border/60 hover:border-accent/50 hover:shadow-glow transition-[box-shadow,border-color] duration-200"
      >
        <div className="poster-cv relative aspect-[2/3] w-full overflow-hidden bg-surface">
          {showImage ? (
            <Image
              src={posterUrl(movie.poster, 400)}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
              placeholder="blur"
              blurDataURL={POSTER_BLUR}
              priority={priority}
              onError={() => {
                setImgError(true);
                onPosterError?.(movie.id);
              }}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-text-muted">
              <ImageOff className="h-8 w-8" aria-hidden />
              <span className="text-xs">No poster</span>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="text-xs uppercase tracking-wider text-accent-2/90">
              View details
            </div>
          </div>
        </div>

        <div className="p-3">
          <h3
            className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-accent-2 transition-colors"
            title={movie.title}
          >
            {movie.title}
          </h3>
          <p className="mt-1 text-xs text-text-muted">{movie.year}</p>
        </div>
      </motion.button>

      {/* Sibling of the card button — never nested, so the markup stays valid. */}
      <FavoriteButton
        active={isFavorite}
        onClick={() => onFavoriteToggle?.(movie)}
      />
    </motion.li>
  );
});

export default memo(MovieCard);

function FavoriteButton({ active, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={active ? "Remove from favourites" : "Add to favourites"}
      whileTap={{ scale: 0.85 }}
      className={clsx(
        "absolute top-2 right-2 z-10 grid h-9 w-9 place-items-center rounded-full backdrop-blur-md transition-colors",
        active
          ? "bg-danger/90 text-white"
          : "bg-black/50 text-white hover:bg-black/70",
      )}
    >
      <Heart
        className={clsx(
          "h-4 w-4 transition-transform",
          active && "fill-current scale-110",
        )}
      />
    </motion.button>
  );
}
