"use client";

import styles from "./page.module.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import { useMemo, useState } from "react";
import debounce from "just-debounce-it";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [sort, setSort] = useState(false);

  const { query, setQuery, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({
    query,
    sort,
  });

  // The debouncedGetMovies function will only be called after 500ms of no change to the query.
  const debouncedGetMovies = useMemo(
    () =>
      debounce(async (query) => {
        if (query) {
          const data = await getMovies({ query });
          if (data === undefined) toast.error("No movies found");
          else toast.success(`Found ${data.length} movies for ${query}`);
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
      <Toaster position="top-right" reverseOrder={false} />
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
        {error && <p className={styles.error}>{error}</p>}
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
