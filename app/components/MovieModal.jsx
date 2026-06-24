"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X, Heart, Star, Clock, Calendar, Film } from "lucide-react";
import clsx from "clsx";
import { getMovieDetail } from "../services/searchMovies";
import { useFocusTrap } from "../hooks/useFocusTrap";
import Spinner from "./Spinner";

export default function MovieModal({
  movie,
  onClose,
  isFavorite,
  onFavoriteToggle,
}) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const focusTrapRef = useFocusTrap(Boolean(movie));

  useEffect(() => {
    if (!movie) {
      setDetail(null);
      setError(null);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    getMovieDetail({ id: movie.id, signal: controller.signal })
      .then((d) => setDetail(d))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [movie]);

  useEffect(() => {
    if (!movie) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [movie, onClose]);

  return (
    <AnimatePresence>
      {movie && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={movie.title}
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4 sm:p-8"
        >
          <motion.div
            ref={focusTrapRef}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface border border-border shadow-card"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {loading && !detail && (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <Spinner size={32} />
                <p className="text-sm text-text-muted">Loading details…</p>
              </div>
            )}

            {error && (
              <div className="py-16 px-8 text-center">
                <p className="text-danger">{error}</p>
              </div>
            )}

            {detail && (
              <div className="grid md:grid-cols-[260px_1fr] gap-6 p-6 sm:p-8">
                <div className="relative aspect-[2/3] w-full max-w-[260px] mx-auto md:mx-0 overflow-hidden rounded-xl bg-surface-2 border border-border">
                  {detail.poster ? (
                    <Image
                      src={detail.poster}
                      alt={detail.title}
                      fill
                      sizes="260px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-text-muted">
                      <Film className="h-10 w-10" />
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-accent-2 mb-2">
                    {detail.type ?? "Movie"}
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                    {detail.title}
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-text-muted">
                    {detail.year && <Pill icon={Calendar}>{detail.year}</Pill>}
                    {detail.runtime && (
                      <Pill icon={Clock}>{detail.runtime}</Pill>
                    )}
                    {detail.rating && (
                      <Pill icon={Star} accent>
                        {detail.rating}
                      </Pill>
                    )}
                    {detail.rated && <Pill>{detail.rated}</Pill>}
                  </div>

                  {detail.genre && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {detail.genre.split(",").map((g) => (
                        <span
                          key={g}
                          className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-xs text-text-muted"
                        >
                          {g.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {detail.plot && (
                    <p className="mt-5 text-sm leading-relaxed text-text/90">
                      {detail.plot}
                    </p>
                  )}

                  <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {detail.director && (
                      <Field label="Director" value={detail.director} />
                    )}
                    {detail.actors && (
                      <Field label="Cast" value={detail.actors} />
                    )}
                  </dl>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => onFavoriteToggle?.(movie)}
                      className={clsx(
                        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                        isFavorite
                          ? "bg-danger text-white"
                          : "bg-accent text-white shadow-glow hover:shadow-glow-lg",
                      )}
                    >
                      <Heart
                        className={clsx(
                          "h-4 w-4",
                          isFavorite && "fill-current",
                        )}
                      />
                      {isFavorite ? "Saved" : "Save to favourites"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Pill({ icon: Icon, children, accent }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs",
        accent
          ? "bg-accent-2/15 text-accent-2 border border-accent-2/30"
          : "bg-surface-2 border border-border text-text-muted",
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-text-muted mb-0.5">
        {label}
      </dt>
      <dd className="text-text/90">{value}</dd>
    </div>
  );
}
