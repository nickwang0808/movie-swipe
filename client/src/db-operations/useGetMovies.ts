import { useEffect, useState } from "react";
import { db } from "../firebase/config";

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
  original_language: OriginalLanguage;
  original_title: string;
  genre_ids: number[];
  title: string;
  vote_average: number;
  overview: string;
  release_date: Date;
}

export interface OriginalLanguage {
  [key: string]: string;
}

export default function useGetMovies(userId: string) {
  const [movieList, setMovieList] = useState<IPopularMovies>(); // TODO: need to fix the type here

  const trimVotedMoviesOnLocal = () => {
    const unTrimmedResults = movieList?.results;
    unTrimmedResults?.shift();
    const trimmedMovieListData = {
      ...movieList,
      results: unTrimmedResults,
    };
  };

  const getVotedMoviesIds = async () => {
    let votedMoviesIds: number[] = []; // TODO: this should be number
    const votedMoviesRef = db
      .collection("Users")
      .doc(userId)
      .collection("User_Details");

    const likedMoviesDoc = await votedMoviesRef.doc("Liked_Movies").get();
    if (likedMoviesDoc.exists) {
      const data = likedMoviesDoc.data()?.liked_movies;
      votedMoviesIds = [...votedMoviesIds, ...data];
    }

    const dislikedMoviesDoc = await votedMoviesRef.doc("Disliked_Movies").get();
    if (dislikedMoviesDoc.exists) {
      const data = dislikedMoviesDoc.data()?.disliked_movies;
      votedMoviesIds = [...votedMoviesIds, ...data];
    }
    return votedMoviesIds;
  };

  const fetchPopularMovies = async (pageNum: number) => {
    const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${REACT_APP_TMDB_KEY}&language=en-US&page=${pageNum}`;
    const response: IPopularMovies = await fetch(url).then((res) => res.json());
    return response;
  };

  const getMovie = async () => {
    const votedMovies = await getVotedMoviesIds();
    const pageNum: number =
      typeof movieList?.page === "number" ? movieList?.page : 1;

    const movieListUnfiltered = await fetchPopularMovies(pageNum);
    const filteredMovieList = () => {
      let newResults: Result[] = []; // TODO: fix type here
      // filter voted movies out
      movieListUnfiltered.results.forEach((result) => {
        if (votedMovies.includes(result.id)) {
          return;
        } else {
          newResults.push(result);
        }
      });
      return newResults;
    };
    const movieListData = {
      ...movieListUnfiltered,
      results: filteredMovieList(),
    };
    setMovieList(movieListData);
  };

  useEffect(() => {
    if (userId) {
      getMovie();
    }
  }, [userId]);

  return { movieList, trimVotedMoviesOnLocal };
}
