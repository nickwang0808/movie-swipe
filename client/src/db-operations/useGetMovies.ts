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
  const [movieList, setMovieList] = useState<Result[]>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  const [movieListInDeck, setMovieListInDeck] = useState<Result[]>();

  useEffect(() => {
    if (movieList) {
      setMovieListInDeck(movieList?.slice(0, 4));
    }
  }, [movieList]);

  const handleNext = () => {
    if (movieList && movieListInDeck) {
      let movieListInDeckCopy = [...movieListInDeck];
      movieListInDeckCopy.shift();
      movieListInDeckCopy.push(movieList[currentIndex + 4]);
      setMovieListInDeck(movieListInDeckCopy);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    let tempStorage: Result[] = [];

    const getVotedMoviesIds = async () => {
      let votedMoviesIds: number[] = [];
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
      // console.log("getMovie()");
      const votedMovies = await getVotedMoviesIds();
      const movieListUnfiltered = await fetchPopularMovies();
      const filteredMovieList = () => {
        let newResults: Result[] = [];
        // filter voted movies out
        movieListUnfiltered.results.forEach((result) => {
          if (!result.backdrop_path) return;
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
        if (movieListInDeck) {
          return [...movieListInDeck, ...tempStorage, ...filteredMovieList()];
        } else {
          return [...tempStorage, ...filteredMovieList()];
        }
      });
      setPageNum(movieListUnfiltered.page);
    }
    if (userId) {
      getMovie();
    }
    // do not add movieListInDeck in the dep array, it will cause infinite loop
    // eslint-disable-next-line
  }, [userId, pageNum]);

  useEffect(() => {
    if (movieList) {
      if ((movieList?.length as number) - currentIndex < 5) {
        console.log("refetch");
        setPageNum((prev) => prev + 1);
        setCurrentIndex(0);
      }
    }
  }, [currentIndex, movieList]);

  return { movieListInDeck, handleNext };
}
