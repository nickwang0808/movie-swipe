import { MovieDetail } from "../db-operations/useGetLikedMovies";

const getGenres = (movie: MovieDetail) => {
  const genresArray: string[] = [];
  movie.genres.forEach((genre) => {
    genresArray.push(genre.name);
  });
  return genresArray.join(", ");
};

export default getGenres;
