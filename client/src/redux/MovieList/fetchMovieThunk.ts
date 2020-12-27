import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFetchedMovieListResult } from "../../MovieTypes/FetchedMoviesTypes";
import { IAppDispatch, IAppState } from "../../store";
import fetchAndFilterMovies from "./fetchAndFilterMovies";

interface IFetchResult {
  pageNum: number;
  processedMovieLists: IFetchedMovieListResult[];
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
    const mediaListTypePref = store.profile.profile?.mediaListTypePref;
    const { DisLiked, Watched, Liked } = store.voted;
    const { pageNum, movieList } = store.movieList;

    const VotedMovieIds = [
      ...(DisLiked || []),
      ...(Watched || []),
      ...(Liked || []),
    ].map((elem) => elem.id);

    const result = await fetchAndFilterMovies(
      pageNum,
      VotedMovieIds,
      genrePreference,
      movieList,
      mediaListTypePref
    );

    console.log("fetchMovies");
    return result;
  },
  {
    condition: (_, { getState, extra }) => {
      const { movieList } = getState().movieList;
      if (movieList.length > 5) return false;
    },
  }
);

export default fetchMovie;
