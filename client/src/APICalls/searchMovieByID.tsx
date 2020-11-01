const searchMovieByID = async (ID: number) => {
  const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
  const url = `https://api.themoviedb.org/3/movie/${ID}?api_key=${REACT_APP_TMDB_KEY}&language=en-US&&append_to_response=videos,release_dates`;
  const response: MovieDetail = await fetch(url).then((res) => res.json());
  console.log(response);
  return response;
};

export default searchMovieByID;

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: IVideos;
  release_dates: IReleaseDates;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

// =====================
export interface IVideos {
  id: number;
  results: IVideosResult[];
}

export interface IVideosResult {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

// ====================
export interface IReleaseDates {
  id: number;
  results: IReleaseDatesResult[];
}

export interface IReleaseDatesResult {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface ReleaseDate {
  certification: string;
  iso_639_1: string;
  release_date: Date;
  type: number;
  note?: string;
}
