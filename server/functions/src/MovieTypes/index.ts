import { IExtendedMovieDetails } from "./ExtendedMovieDetails";
import { IExtendedTvDetails } from "./ExtendedTvDetails";

interface IVotedAttributes {
  uid: string;
  isLike: boolean;
  matchedWith: IProfileDetails[];
  timeMatched: number | null;
  timeVoted: number;
  notify: boolean;
}

interface IWatchedAttributes {
  watchedWith: IProfileDetails[];
  timeWatched: number;
}

export interface IVotedMovies
  extends IExtendedMovieDetails,
    IProfileDetails,
    IVotedAttributes {}

export interface IVotedMTvs
  extends IExtendedTvDetails,
    IProfileDetails,
    IVotedAttributes {}

export interface IWatchedMovies extends IVotedMovies, IWatchedAttributes {}

export interface IProfileDetails extends IUserAuth {
  genrePreference: number[];
  mediaListTypePref: IMediaPref;
}

export interface IUserAuth {
  displayName: string | null;
  email: string | null;
  isAnonymous: boolean;
  photoURL: null | string;
  uid: string;
}

export type movieListTypes =
  | "upcoming"
  | "top_rated"
  | "popular"
  | "now_playing";

export type tvListTypes = "top_rated" | "popular" | "on_the_air";

export interface SelectMovies {
  media: "movie";
  catagories: movieListTypes;
}

export interface SelectTvs {
  media: "tv";
  catagories: tvListTypes;
}

export type IMediaPref = SelectMovies | SelectTvs;
