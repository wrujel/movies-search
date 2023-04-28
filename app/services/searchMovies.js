const URL = process.env.NEXT_PUBLIC_URL_PATH;
const KEY = process.env.NEXT_PUBLIC_API_KEY;

export const searchMovies = async ({ query }) => {
  if (query === "") return null;

  try {
    const response = await fetch(`${URL}${KEY}&s=${query}`);
    const json = await response.json();

    const movies = json?.Search;

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster === "N/A" ? null : movie.Poster,
    }));
  } catch (error) {
    throw new Error("Error fetching movies");
  }
};
