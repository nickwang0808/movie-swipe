import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "../../MovieTypes/IPopularMovies";

interface IVotedMovieReducer {
  isLoaded: boolean;
  Liked: Result[];
  DisLiked: Result[];
  Watched: Result[];
}

const initialState: IVotedMovieReducer = {
  isLoaded: false,
  Liked: [],
  DisLiked: [],
  Watched: [],
};

const votedMovieReducer = createSlice({
  name: "firestore",
  initialState,
  reducers: {
    setLiked: ({ Liked }, action: PayloadAction<Result[]>) => {
      Liked = [...Liked, ...action.payload];
    },
    setWatched: ({ Watched }, action: PayloadAction<Result[]>) => {
      Watched = [...Watched, ...action.payload];
    },
    setDisLiked: ({ DisLiked }, action: PayloadAction<Result[]>) => {
      DisLiked = [...DisLiked, ...action.payload];
    },
  },
});

export const { setDisLiked, setLiked, setWatched } = votedMovieReducer.actions;
export default votedMovieReducer.reducer;
