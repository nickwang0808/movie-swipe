import { IExtendedMovieDetails } from "../MovieTypes/ExtendedMovieDetails";
import { IExtendedTvDetails } from "../MovieTypes/ExtendedTvDetails";
import { store } from "../store";

export default async function fetchVidActorProvider(movieId: number) {
  const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
  const { type } = store.getState().movieList;
  const url = `https://api.themoviedb.org/3/${type}/${movieId}?api_key=${REACT_APP_TMDB_KEY}&language=en-US&append_to_response=${
    type === "tv" ? "" : "release_dates%2C"
  }videos%2Cwatch%2Fproviders%2Ccredits`;
  const response: IExtendedMovieDetails | IExtendedTvDetails = await fetch(
    url
  ).then((res) => res.json());
  return response;
}
