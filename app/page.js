"use client";

import styles from "./page.module.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";

export default function Home() {
  const { query, setQuery, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ query });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  };

  const handleChange = (event) => {
    const query = event.target.value;
    if (query.startsWith(" ")) return;
    setQuery(event.target.value);
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
