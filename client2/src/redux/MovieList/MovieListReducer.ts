import { createSlice } from "@reduxjs/toolkit";
import { Result } from "../../MovieTypes/IPopularMovies";
import fetchMovie from "./fetchMovieThunk";

interface IMovieListState {
  movieList: Result[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  pageNum: number;
}

const initialState: IMovieListState = {
  movieList: [],
  error: null,
  status: "idle",
  pageNum: 1,
};

const movieListSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {
    voteMovie: (state) => {
      state.movieList.shift();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovie.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovie.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.movieList = action.payload.processedMovieLists;
      state.pageNum = action.payload.pageNum;
    });
    builder.addCase(fetchMovie.rejected, (state, action) => {
      state.status = "failed";
      if (!action.error.message) {
        state.error = null;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export const { voteMovie } = movieListSlice.actions;
export default movieListSlice.reducer;
