import { IProfileDetails } from "../redux/Profile/profileReducer";
import { IExtendedMovieDetails } from "./ExtendedMovieDetails";

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

export interface IWatchedMovies extends IVotedMovies, IWatchedAttributes {}
