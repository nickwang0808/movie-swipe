import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserAuth } from "../Auth/AuthReducer";

export type movieListTypes =
  | "upcoming"
  | "top_rated"
  | "popular"
  | "now_playing";

export const movieListTypesObj = [
  { name: "Upcoming", value: "upcoming" },
  { name: "Top Rated", value: "top_rated" },
  { name: "Popular", value: "popular" },
  { name: "Now Playing", value: "now_playing" },
];

export type tvListTypes = "top_rated" | "popular" | "on_the_air";

export const tvListTypesObj = [
  { name: "Top Rated", value: "top_rated" },
  { name: "Popular", value: "popular" },
  { name: "On The Air", value: "on_the_air" },
];

export interface SelectMovies {
  media: "movie";
  catagories: movieListTypes;
}

export interface SelectTvs {
  media: "tv";
  catagories: tvListTypes;
}

export type IMediaPref = SelectMovies | SelectTvs;

export interface IProfileDetails extends IUserAuth {
  genrePreference: number[];
  mediaListTypePref: IMediaPref;
}

interface IProfile {
  isLoaded: boolean;
  profile: IProfileDetails | null;
  error: string | null;
}

const initialState: IProfile = {
  isLoaded: false,
  profile: null,
  error: null,
};

const profileReducer = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<IProfileDetails>) => {
      state.isLoaded = true;
      state.profile = action.payload;
    },
    profileError: (state, action: PayloadAction<string>) => {
      state.isLoaded = true;
      state.error = action.payload;
    },
  },
});

export const { profileError, setProfile } = profileReducer.actions;
export default profileReducer.reducer;
