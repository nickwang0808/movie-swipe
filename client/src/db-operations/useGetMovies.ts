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
  const [movieList, setMovieList] = useState<Result[]>(); // TODO: need to fix the type here
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
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

      const dislikedMoviesDoc = await votedMoviesRef
        .doc("Disliked_Movies")
        .get();
      if (dislikedMoviesDoc.exists) {
        const data = dislikedMoviesDoc.data()?.disliked_movies;
        votedMoviesIds = [...votedMoviesIds, ...data];
      }
      return votedMoviesIds;
    };

    const fetchPopularMovies = async () => {
      const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${REACT_APP_TMDB_KEY}&language=en-US&page=${pageNum}`;
      const response: IPopularMovies = await fetch(url).then((res) =>
        res.json()
      );
      return response;
    };

    async function getMovie() {
      console.log("getMovie()");
      const votedMovies = await getVotedMoviesIds();
      const movieListUnfiltered = await fetchPopularMovies();
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

      /* results need to be at least 3 in length to render the stack, if no,
       just return setPageNum + 1 and 
      the function will re-run until it finds at least 3  */
      if (filteredMovieList().length < 3) {
        return setPageNum((prev) => prev + 1);
      }

      setMovieList((prev) => {
        if (prev) {
          return [...prev, ...filteredMovieList()];
        } else {
          return filteredMovieList();
        }
      });
      setPageNum(movieListUnfiltered.page);
    }
    if (userId) {
      getMovie();
    }
  }, [userId, pageNum]);

  useEffect(() => {
    if ((movieList?.length as number) - currentIndex < 4) {
      setPageNum((prev) => prev + 1);
    }
  }, [currentIndex, movieList]);

  return { movieList, currentIndex, setCurrentIndex };
}
