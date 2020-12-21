import { IExtendedMovieDetails } from "../MovieTypes/ExtendedMovieDetails";
import { IExtendedTvDetails } from "../MovieTypes/ExtendedTvDetails";
import { store } from "../store";

export default async function fetchVidActorProvider(movieId: number) {
  const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
  const mediaListTypePref = store.getState().profile.profile?.mediaListTypePref;
  const url = `https://api.themoviedb.org/3/${
    mediaListTypePref?.media
  }/${movieId}?api_key=${REACT_APP_TMDB_KEY}&language=en-US&append_to_response=${
    mediaListTypePref?.media === "tv" ? "" : "release_dates%2C"
  }videos%2Cwatch%2Fproviders%2Ccredits`;
  const response: IExtendedMovieDetails | IExtendedTvDetails = await fetch(
    url
  ).then((res) => res.json());
  return response;
}
