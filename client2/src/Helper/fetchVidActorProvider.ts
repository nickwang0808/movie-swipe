import { IMovieDetailsForDetailsScreen } from "../MovieTypes/IDetialsScreen";

export default async function fetchVidActorProvider(movieId: number) {
  const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${REACT_APP_TMDB_KEY}&language=en-US&append_to_response=release_dates%2Cvideos%2Cwatch%2Fproviders%2Ccredits`;
  const response: IMovieDetailsForDetailsScreen = await fetch(url).then((res) =>
    res.json()
  );
  return response;
}
