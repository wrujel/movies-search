import Image from "next/image";
import styles from "./Movies.module.css";

function ListOfMovies ({movies}) {
  return (
    <ul className={styles.movies} >
      {movies.map((movie) => (
        <li className={styles.movie} key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <Image
            src={movie.poster}
            alt={movie.title}
            width={200}
            height={200}
          />
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