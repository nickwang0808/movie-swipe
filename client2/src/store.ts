import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./redux/Auth/AuthReducer";
import friendsReducer from "./redux/Friends/friendsReducer";
import MovieListReducer from "./redux/MovieList/MovieListReducer";
import profileReducer from "./redux/Profile/profileReducer";
import votedMovieReducer from "./redux/Voted/votedMovieReducer";
import WindowSizingReducer from "./redux/WindowSize/WindowSizingReducer";

export const store = configureStore({
  reducer: {
    auth: userSliceReducer,
    profile: profileReducer,
    windowSizing: WindowSizingReducer,
    voted: votedMovieReducer,
    movieList: MovieListReducer,
    friends: friendsReducer,
  },
});

export type IAppState = ReturnType<typeof store.getState>;

export type IAppDispatch = typeof store.dispatch;
