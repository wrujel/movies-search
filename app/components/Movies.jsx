import styles from "./Movies.module.css";
import ImageContainer from "./ImageContainer";

function ListOfMovies ({movies}) {
  return (
    <ul className={styles.movies} >
      {movies.map((movie) => (
        <ImageContainer movie={movie} key={movie.id} />
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