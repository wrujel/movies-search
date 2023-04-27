import Image from "next/image";

function ListOfMovies ({movies}) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <Image
            src={movie.poster}
            alt={movie.title}
            width={300}
            height={300}
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