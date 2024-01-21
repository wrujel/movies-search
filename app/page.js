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
        <h1 className="mb-6">Movie Search</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-3">
            <div className="flex gap-3">
              <input
                onChange={handleChange}
                value={query}
                type="text"
                className="m-0"
                placeholder="Search for movies"
              />
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-0"
                type="submit"
              >
                Search
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="sort"
                value="sort"
                className="m-0 sm:ml-4"
                onClick={handleSort}
              />
              Sort by year
            </div>
          </div>
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
