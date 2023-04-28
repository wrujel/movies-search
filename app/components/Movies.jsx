import Image from "next/image";
import styles from "./Movies.module.css";

function ListOfMovies ({movies}) {
  return (
    <ul className={styles.movies} >
      {movies.map((movie) => (
        <li className={styles.movie} key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          {movie.poster !== null 
          ? <Image
            src={movie.poster}
            alt={movie.title}
            width={0}
            height={0}
            sizes="100vw"
            className={styles.movieImage}
          />
          : <p>No image available</p>}
        </li>
      ))}
    </ul>
  )
}

function NoMoviesFound () {
  return (
    <div>
      <p>No movies found!</p>
    </div>
  )
}

export function Movies ({movies}) {
  const hasMovies = movies?.length > 0;

  return (
    hasMovies 
      ? <ListOfMovies movies={movies}/>
      : <NoMoviesFound/>
  )
}