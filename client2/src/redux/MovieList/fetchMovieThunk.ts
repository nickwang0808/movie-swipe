import { createAsyncThunk } from "@reduxjs/toolkit";
import { Result } from "../../MovieTypes/IPopularMovies";
import { IAppDispatch, IAppState } from "../../store";
import fetchAndFilterMovies from "./fetchAndFilterMovies";

interface IFetchResult {
  pageNum: number;
  processedMovieLists: Result[];
}

const fetchMovie = createAsyncThunk<
  IFetchResult,
  undefined,
  {
    dispatch: IAppDispatch;
    state: IAppState;
  }
>(
  "movieList/fetchMovieStatus",
  async (_, { getState }) => {
    const store = getState();
    const genrePreference = store.profile.profile?.genrePreference as number[];
    const { DisLiked, Watched, Liked } = store.voted;
    const { pageNum, movieList } = store.movieList;

    const result = await fetchAndFilterMovies(
      pageNum,
      (DisLiked as Result[]).map((elem) => elem.id),
      (Watched as Result[]).map((elem) => elem.id),
      (Liked as Result[]).map((elem) => elem.id),
      genrePreference,
      movieList.length
    );

    console.log("fetchMovies");
    return result;
  },
  {
    condition: (_, { getState, extra }) => {
      const { movieList } = getState().movieList;
      if (movieList.length > 4) return false;
    },
  }
);

export default fetchMovie;
