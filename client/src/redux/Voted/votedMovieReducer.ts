import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IVotedMovies,
  IVotedMTvs,
  IWatchedMovies,
  IWatchedTvs,
} from "../../MovieTypes";

interface IVotedMovieReducer {
  isLoaded: boolean;
  Liked: Array<IVotedMovies | IVotedMTvs> | null;
  DisLiked: Array<IVotedMovies | IVotedMTvs> | null;
  Watched: IWatchedMovies[] | IWatchedTvs[] | null;
}

const initialState: IVotedMovieReducer = {
  isLoaded: false,
  Liked: null,
  DisLiked: null,
  Watched: null,
};

const votedMovieReducer = createSlice({
  name: "firestore",
  initialState,
  reducers: {
    setLiked: (state, action: PayloadAction<IVotedMovies[]>) => {
      state.Liked = action.payload;
    },
    setWatched: (state, action: PayloadAction<IWatchedMovies[]>) => {
      state.Watched = action.payload;
    },
    setDisLiked: (state, action: PayloadAction<IVotedMovies[]>) => {
      state.DisLiked = action.payload;
    },
  },
});

export const { setDisLiked, setLiked, setWatched } = votedMovieReducer.actions;
export default votedMovieReducer.reducer;
