"use client";

import styles from "./page.module.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import { useMemo, useState } from "react";
import debounce from "just-debounce-it";

export default function Home() {
  const [sort, setSort] = useState(false);

  const { query, setQuery, errorQuery } = useSearch();
  const { movies, loading, getMovies } = useMovies({
    query,
    sort,
  });

  // The debouncedGetMovies function will only be called after 500ms of no change to the query.
  const debouncedGetMovies = useMemo(
    () =>
      debounce((query) => {
        if (query) {
          getMovies({ query });
        }
      }, 500),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ query });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newQuery = event.target.value;
    if (newQuery.startsWith(" ")) return;
    setQuery(newQuery);
    debouncedGetMovies(newQuery);
  };

  return (
    <div className={styles.page}>
      <header>
        <h1>Movie Search</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={query}
            type="text"
            placeholder="Search for movies"
          />
          <button type="submit">Search</button>
          <input
            type="checkbox"
            id="sort"
            name="sort"
            value="sort"
            onClick={handleSort}
          />
          Sort by year
        </form>
        {errorQuery && <p className={styles.error}>{errorQuery}</p>}
      </header>

      <main>
        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : (
          <Movies movies={movies} />
        )}
      </main>
    </div>
  );
}
