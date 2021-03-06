import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExtendedMovieDetails } from "../../MovieTypes/ExtendedMovieDetails";
import { IExtendedTvDetails } from "../../MovieTypes/ExtendedTvDetails";
import { IFetchedMovieListResult } from "../../MovieTypes/FetchedMoviesTypes";
import { ITvListResults } from "../../MovieTypes/FetchedTvTypes";
import fetchMovie from "./fetchMovieThunk";
import { populateMovieDetailsThunk } from "./populateMovieDetailsThunk";

interface IMovieListState {
  movieList: Array<
    | IFetchedMovieListResult
    | IExtendedMovieDetails
    | ITvListResults
    | IExtendedTvDetails
  >;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  pageNum: number;
}

const initialState: IMovieListState = {
  movieList: [],
  error: null,
  status: "idle",
  pageNum: 1, // pageNum is for next fetch action, not current pageNum
};

const movieListSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {
    voteMovie: (state) => {
      state.movieList.shift();
    },
    ResetPageNum: (state) => {
      state.pageNum = 1;
    },
    clearMovieList: (state) => {
      state.status = "idle";
      state.movieList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovie.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovie.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.movieList = [
        ...state.movieList,
        ...action.payload.processedMovieLists,
      ];
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

    builder.addCase(
      populateMovieDetailsThunk.fulfilled,
      (state, action: PayloadAction<IExtendedMovieDetails>) => {
        state.status = "succeeded";
        state.movieList[0] = action.payload;
      }
    );
    builder.addCase(populateMovieDetailsThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(populateMovieDetailsThunk.rejected, (state, action) => {
      state.status = "failed";
      if (!action.error.message) {
        state.error = "something wrong happened";
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export const {
  voteMovie,
  ResetPageNum,
  clearMovieList,
} = movieListSlice.actions;
export default movieListSlice.reducer;
