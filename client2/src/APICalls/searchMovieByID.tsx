import { MovieDetail } from "../db-operations/useGetLikedMovies";

const searchMovieByID = async (ID: number) => {
  const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
  const url = `https://api.themoviedb.org/3/movie/${ID}?api_key=${REACT_APP_TMDB_KEY}&language=en-US`;
  const response: MovieDetail = await fetch(url).then((res) => res.json());
  return response;
};

export default searchMovieByID;
