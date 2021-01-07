import { createAsyncThunk } from "@reduxjs/toolkit";
import { IExtendedMovieDetails } from "../../MovieTypes/ExtendedMovieDetails";
import { IAppDispatch, IAppState, store } from "../../store";

export const populateMovieDetailsThunk = createAsyncThunk<
  IExtendedMovieDetails,
  undefined,
  {
    dispatch: IAppDispatch;
    state: IAppState;
  }
>("movieList/populate", async (_, { getState }) => {
  const leadCardMovieInfo = getState().movieList.movieList[0];
  const additionalInfo = await fetchAdditionalMovieDetails(
    leadCardMovieInfo.id
  );

  return additionalInfo;
});

async function fetchAdditionalMovieDetails(movieId: number) {
  const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
  const mediaListTypePref = store.getState().profile.profile?.mediaListTypePref;
  const url = `https://api.themoviedb.org/3/${
    mediaListTypePref?.media
  }/${movieId}?api_key=${REACT_APP_TMDB_KEY}&language=en-US&append_to_response=videos%2C${
    mediaListTypePref?.media === "tv" ? "" : "release_dates%2C"
  }watch%2Fproviders%2Ccredits`;
  // const url = `https://api.themoviedb.org/3/${type}/${movieId}?api_key=${REACT_APP_TMDB_KEY}&language=en-US&append_to_response=videos%2Cwatch%2Fproviders%2Ccredits`;
  const response = (await fetch(url).then((res) =>
    res.json()
  )) as IExtendedMovieDetails;
  return response;
}
