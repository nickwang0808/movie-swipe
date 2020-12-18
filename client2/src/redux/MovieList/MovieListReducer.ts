import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFetchedMovieListResult, IPopulatedResult } from "../../MovieTypes";
import fetchMovie from "./fetchMovieThunk";
import { populateMovieDetailsThunk } from "./populateMovieDetailsThunk";

interface IMovieListState {
  movieList: Array<IFetchedMovieListResult | IPopulatedResult>;
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
      (state, action: PayloadAction<IPopulatedResult>) => {
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

export const { voteMovie, ResetPageNum } = movieListSlice.actions;
export default movieListSlice.reducer;
