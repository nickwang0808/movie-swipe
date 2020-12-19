import { IProfileDetails } from "../redux/Profile/profileReducer";
import { ReleaseDates, Videos } from "./IDetialsScreen";
import { IMovieDetails } from "./IGetMovieDetails";

export interface IPopularMovies {
  page: number;
  total_results: number;
  total_pages: number;
  results: IFetchedMovieListResult[];
}

export interface IFetchedMovieListResult {
  popularity: number;
  vote_count: number;
  video: boolean;
  poster_path: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_title: string;
  genre_ids: number[];
  title: string;
  vote_average: number;
  overview: string;
  release_date: Date;
}

export interface IAdditionalMovieInfo extends IMovieDetails {
  genre_ids: number[];
  release_dates: ReleaseDates;
  videos: Videos;
}

export interface IVotedMovies extends IAdditionalMovieInfo, IProfileDetails {
  uid: string;
  isLike: boolean;
  matchedWith: IProfileDetails[];
  timeMatched: number | null;
  timeVoted: number;
  notify: boolean;
}

export interface IWatchedMovies extends IVotedMovies {
  watchedWith: IProfileDetails[];
  timeWatched: number;
}

/* 
match: [

  top_rated:
]

 */
