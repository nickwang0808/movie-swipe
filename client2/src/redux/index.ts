import { combineReducers } from "@reduxjs/toolkit";
import userSliceReducer from "./Auth/AuthReducer";
import MovieDetailsReducer from "./DetailsScreenState/DetailsScreenReducer";
import friendsReducer from "./Friends/friendsReducer";
import MovieListReducer from "./MovieList/MovieListReducer";
import notificationReducer from "./Notification/notificationReducer";
import profileReducer from "./Profile/profileReducer";
import votedMovieReducer from "./Voted/votedMovieReducer";
import WindowSizingReducer from "./WindowSize/WindowSizingReducer";

const rootReducer = combineReducers({
  auth: userSliceReducer,
  profile: profileReducer,
  windowSizing: WindowSizingReducer,
  voted: votedMovieReducer,
  movieList: MovieListReducer,
  friends: friendsReducer,
  notification: notificationReducer,
  detailsState: MovieDetailsReducer,
});

export default rootReducer;
