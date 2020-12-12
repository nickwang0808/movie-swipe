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
    const genrePreference = store.firebase.profile.genrePreference;
    const { LikedMovieIds, DislikedMovieIds } = store.firestore.ordered;
    const { pageNum, movieList } = store.movieList;

    const result = await fetchAndFilterMovies(
      pageNum,
      LikedMovieIds.map((elem: any) => elem.movieId),
      DislikedMovieIds.map((elem: any) => elem.movieId),
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
