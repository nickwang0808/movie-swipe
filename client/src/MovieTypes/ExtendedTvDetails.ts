import { Credits, Videos, WatchProviders } from "./ExtendedMovieDetails";

export interface IExtendedTvDetails {
  backdrop_path: string | null;
  // created_by: object[];
  episode_run_time: number[];
  first_air_date: string;
  genres: TvGenre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: null;
  networks: TvNetworks[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  // production_companies: object[];
  // production_countries: object[];
  seasons: TvSeasons[];
  // spoken_languages: object[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: Videos;
  credits: Credits;
  "watch/providers": WatchProviders;
}

export interface TvGenre {
  id: number;
  name: string;
}

export interface LastEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface TvNetworks {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

export interface TvSeasons {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}
