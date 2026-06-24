"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";

import { Movies } from "./components/Movies";
import SearchBar from "./components/SearchBar";
import Hero from "./components/Hero";
import FilterBar from "./components/FilterBar";
import EmptyState from "./components/EmptyState";
import MovieModal from "./components/MovieModal";
import Toaster from "./components/Toaster";
import Spinner, { SkeletonCard } from "./components/Spinner";

import { useSearch } from "./hooks/useSearch";
import { useMovies } from "./hooks/useMovies";
import { useFavorites } from "./hooks/useFavorites";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { useAutocomplete } from "./hooks/useAutocomplete";
import { useRecentSearches } from "./hooks/useRecentSearches";
import { useDebouncedCallback } from "./hooks/useDebouncedCallback";
import { getMovieDetail } from "./services/searchMovies";
import { isValidQuery } from "./lib/query";

export default function Home() {
  const [sort, setSort] = useState("off"); // 'off' | 'desc' | 'asc'
  const [yearRange, setYearRange] = useState([null, null]);
  const [type, setType] = useState("all");
  const [includeNoPoster, setIncludeNoPoster] = useState(false);
  const [selected, setSelected] = useState(null);

  const { query, setQuery, error: validationError } = useSearch();

  const effectiveYear = useMemo(() => {
    const [from, to] = yearRange;
    if (from != null && to != null && from === to) return from;
    return null;
  }, [yearRange]);

  const {
    movies,
    rawCount,
    totalResults,
    loading,
    loadingMore,
    error: fetchError,
    hasMore,
    getMovies,
    loadMore,
    reset,
    markPosterBroken,
  } = useMovies({
    query,
    sort,
    yearRange,
    type,
    year: effectiveYear,
    includeNoPoster,
  });

  const { suggestions, loading: loadingSuggestions } = useAutocomplete({
    query,
    type,
    year: effectiveYear,
  });

  const favorites = useFavorites();
  const recents = useRecentSearches();

  const debouncedGetMovies = useDebouncedCallback((q) => {
    if (!isValidQuery(q)) return;
    getMovies({ query: q });
  }, 500);

  const handleChange = (event) => {
    const newQuery = event.target.value;
    if (newQuery.startsWith(" ")) return;
    setQuery(newQuery);
    if (isValidQuery(newQuery)) {
      debouncedGetMovies(newQuery);
    } else {
      debouncedGetMovies.cancel?.();
    }
  };

  const handleClear = () => {
    setQuery("");
    debouncedGetMovies.cancel?.();
    reset();
  };

  const handleSuggestion = useCallback(
    (term) => {
      setQuery(term);
      if (isValidQuery(term)) debouncedGetMovies(term);
    },
    [setQuery, debouncedGetMovies],
  );

  const handleSuggestionSelect = useCallback(
    (term) => {
      if (typeof term !== "string" || !term.trim()) return;
      const value = term.trim();
      setQuery(value);
      debouncedGetMovies.cancel?.();
      if (isValidQuery(value)) {
        getMovies({ query: value });
        recents.add(value);
      }
    },
    [setQuery, debouncedGetMovies, getMovies, recents],
  );

  // Save the query to recents once a search returns at least one result
  const lastSavedRef = useRef("");
  useEffect(() => {
    if (loading) return;
    if (!Array.isArray(movies) || movies.length === 0) return;
    const trimmed = query.trim();
    if (!trimmed) return;
    const key = trimmed.toLowerCase();
    if (lastSavedRef.current === key) return;
    lastSavedRef.current = key;
    recents.add(trimmed);
  }, [loading, movies, query, recents]);

  // Re-fire the search when year or type changes (both filter server-side now).
  useEffect(() => {
    if (!isValidQuery(query)) return;
    debouncedGetMovies.cancel?.();
    getMovies({ query });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveYear, type]);

  // Warm the detail cache when a card is hovered/focused so the modal opens
  // instantly. Errors are swallowed — this is best-effort.
  const prefetchDetail = useCallback((id) => {
    getMovieDetail({ id }).catch(() => {});
  }, []);

  const sentinelRef = useInfiniteScroll({
    onLoadMore: loadMore,
    enabled: hasMore && !loading && !loadingMore && !validationError,
    // Fire ~a screen early so the next page is usually in hand before the user
    // reaches the bottom.
    rootMargin: "1000px",
  });

  const hasQuery = query.trim().length > 0;
  const visibleCount = Array.isArray(movies) ? movies.length : 0;

  const filtersActive =
    type !== "all" ||
    sort !== "off" ||
    includeNoPoster ||
    yearRange[0] != null ||
    yearRange[1] != null;

  // Keep the toolbar visible whenever a search ran or a filter is narrowing it,
  // so a filter that yields nothing can't strand the user with no way back.
  const showResults =
    hasQuery &&
    !validationError &&
    (rawCount > 0 || (movies != null && filtersActive));

  const isEmpty =
    hasQuery &&
    !validationError &&
    !loading &&
    Array.isArray(movies) &&
    movies.length === 0;

  let emptyVariant = null;
  if (fetchError) emptyVariant = "error";
  else if (!hasQuery && !loading && movies == null) emptyVariant = "idle";
  else if (isEmpty)
    emptyVariant = filtersActive || rawCount > 0 ? "no-matches" : "no-results";

  return (
    <MotionConfig reducedMotion="user">
      <Toaster />

      <main className="relative min-h-screen w-full">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-24">
          <Hero collapsed={rawCount > 0} />

          <div className="relative z-10 mt-2 flex flex-col items-center gap-4">
            <SearchBar
              value={query}
              onChange={handleChange}
              onClear={handleClear}
              error={validationError}
              suggestions={suggestions}
              recents={recents.recents}
              loadingSuggestions={loadingSuggestions}
              onSelect={handleSuggestionSelect}
              onRemoveRecent={recents.remove}
            />

            {showResults && (
              <FilterBar
                sort={sort}
                onSortChange={setSort}
                yearRange={yearRange}
                onYearRangeChange={setYearRange}
                type={type}
                onTypeChange={setType}
                includeNoPoster={includeNoPoster}
                onIncludeNoPosterChange={setIncludeNoPoster}
              />
            )}
          </div>

          <section className="mt-8 relative z-0" aria-live="polite">
            {showResults && (
              <div className="mb-3 flex items-baseline gap-1.5 text-[12px] tabular-nums">
                <span className="font-semibold text-text">{visibleCount}</span>
                {visibleCount === rawCount && totalResults > rawCount ? (
                  <>
                    <span className="text-text-muted">of</span>
                    <span className="font-semibold text-text-muted">
                      {totalResults}
                    </span>
                    <span className="text-text-muted">results</span>
                  </>
                ) : (
                  <span className="text-text-muted">results</span>
                )}
              </div>
            )}
            {loading && rawCount === 0 ? (
              <SkeletonGrid />
            ) : emptyVariant ? (
              <EmptyState
                variant={emptyVariant}
                error={fetchError}
                onSuggestionClick={handleSuggestion}
              />
            ) : (
              showResults && (
                <Movies
                  movies={movies}
                  onSelect={setSelected}
                  isFavorite={favorites.has}
                  onFavoriteToggle={favorites.toggle}
                  onPosterError={markPosterBroken}
                  onPrefetch={prefetchDetail}
                />
              )
            )}

            {showResults && hasMore && (
              <div
                ref={sentinelRef}
                className="flex items-center justify-center gap-2 py-10 text-sm text-text-muted"
              >
                <Spinner size={18} />
                Loading more…
              </div>
            )}
          </section>
        </div>
      </main>

      <MovieModal
        movie={selected}
        onClose={() => setSelected(null)}
        isFavorite={selected ? favorites.has(selected.id) : false}
        onFavoriteToggle={favorites.toggle}
      />
    </MotionConfig>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid w-full gap-5 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
