export interface IGetMovieTrailers {
  id: number;
  results: Result[];
}

export interface Result {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export default async function getMovieTrailers(movieId: number) {
  const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${REACT_APP_TMDB_KEY}&language=en-US`;
  const movieTrailers: IGetMovieTrailers = await fetch(url).then((res) =>
    res.json()
  );

  try {
    return `https://www.youtube.com/embed/${movieTrailers.results[0].key}?rel=0&amp;controls=1&amp&amp;showinfo=0&amp;modestbranding=1`;
  } catch {
    return null;
  }
}
