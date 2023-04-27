import styles from "./page.module.css";
import responseMovies from "./mocks/search-with-results.json";
import withoutResults from "./mocks/search-without-results.json";
import { Movies } from "./components/Movies";

export default function Home() {
  const movies = responseMovies.Search;

  const mappedMovies = movies?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
  }));

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
        <Movies movies={mappedMovies} />
      </main>
    </div>
  );
}
