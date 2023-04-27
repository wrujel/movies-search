import styles from "./page.module.css";
import responseMovies from "./mocks/search-with-results.json";
import withoutResults from "./mocks/search-without-results.json";
import Image from "next/image";

export default function Home() {
  const movies = responseMovies.Search;
  const hasMovies = movies?.length > 0;

  return (
    <div className={styles.page}>
      <header>
        <h1>Movie Search</h1>
        <form className="form">
          <input type="text" placeholder="Search for movies and TV shows" />
          <button type="submit">Search</button>
        </form>
      </header>

      <main>
        {hasMovies ? (
          <ul className={styles.movies}>
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <h3 className={styles.title}>{movie.Title}</h3>
                <p className={styles.year}>{movie.Year}</p>
                <Image
                  src={movie.Poster}
                  alt={movie.Title}
                  width={200}
                  height={200}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No movies found</p>
        )}
      </main>
    </div>
  );
}
