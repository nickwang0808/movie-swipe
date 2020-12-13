import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "../../MovieTypes/IPopularMovies";

interface IVotedMovieReducer {
  isLoaded: boolean;
  Liked: Result[] | null;
  DisLiked: Result[] | null;
  Watched: Result[] | null;
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
    setLiked: (state, action: PayloadAction<Result[]>) => {
      state.Liked = action.payload;
    },
    setWatched: (state, action: PayloadAction<Result[]>) => {
      state.Watched = action.payload;
    },
    setDisLiked: (state, action: PayloadAction<Result[]>) => {
      state.DisLiked = action.payload;
    },
  },
});

export const { setDisLiked, setLiked, setWatched } = votedMovieReducer.actions;
export default votedMovieReducer.reducer;
