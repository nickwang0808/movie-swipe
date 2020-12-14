import { IProfileDetails } from "../redux/Profile/profileReducer";

export interface IPopularMovies {
  page: number;
  total_results: number;
  total_pages: number;
  results: Result[];
}

export interface Result {
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

export interface IVotedMovies extends Result, IProfileDetails {
  uid: string;
  isLike: boolean;
  matchedWith: IProfileDetails[];
  timeMatched: number | null;
  timeVoted: number;
  notify: boolean;
}

/* 
match: [

  top_rated:
]

 */
