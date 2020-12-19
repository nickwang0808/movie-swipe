import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAdditionalMovieInfo, IPopulatedResult } from "../../MovieTypes/index";
import { IAppDispatch, IAppState } from "../../store";

export const populateMovieDetailsThunk = createAsyncThunk<
  IPopulatedResult,
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

  return { ...leadCardMovieInfo, ...additionalInfo };
});

async function fetchAdditionalMovieDetails(movieId: number) {
  const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${REACT_APP_TMDB_KEY}&language=en-US&append_to_response=videos%2Crelease_dates`;
  const response = (await fetch(url).then((res) =>
    res.json()
  )) as IAdditionalMovieInfo;
  return response;
}
