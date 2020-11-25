import { useEffect, useState } from "react";
import genreList from "../comps/other/genreList";
import { db } from "../firebase/config";
import { IWatchedMovieInfo } from "./useGetLikedMovies";

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
  const storedPageNum = localStorage.getItem("pageNum");
  const [pageNum, setPageNum] = useState(
    storedPageNum ? Number(storedPageNum) : 1
  );

  const [movieList, setMovieList] = useState<Result[]>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [genrePref, setGenrePref] = useState<number[]>();

  const [movieListInDeck, setMovieListInDeck] = useState<Result[]>();

  // take the first 4 cards in the movie list
  useEffect(() => {
    if (movieList) {
      setMovieListInDeck(movieList?.slice(0, 4));
    }
  }, [movieList]);

  // remove first card, and get another card from the movieList,
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
    async function getMovie() {
      let votedMovies = await getVotedMoviesIds(userId);
      const movieListUnfiltered = await fetchPopularMovies(pageNum);
      const genrePreference = await fetchGenrePreference(userId, setGenrePref);

      // join local voted with db votes
      const localVoted = GetLocalVoted();
      if (localVoted) {
        votedMovies = [
          ...localVoted,
          // voted movie may return [0] instead of null
          ...(votedMovies !== [0] ? votedMovies : []),
        ];
      }
      const filteredMovieList = () => {
        let newResults: Result[] = [];
        // filter voted movies out
        movieListUnfiltered.results.forEach((result) => {
          if (!result.backdrop_path) return; // if movie hs no poster skip
          if (votedMovies.includes(result.id)) return; // if voted skip
          if (genreFiltering(result.genre_ids, genrePreference) === "fail") {
            return; // if filtered in genre, skip
          }
          newResults.push(result);
        });
        return newResults;
      };

      /* results need to be at least 3 in length to render the stack, if no,
       just return setPageNum + 1 and 
      the function will re-run until it finds at least 3  */
      if (filteredMovieList().length < 3) {
        return setPageNum((prev) => prev + 1);
      }

      setMovieList(() => {
        if (movieListInDeck) {
          return [...movieListInDeck, ...filteredMovieList()];
        } else {
          return [...filteredMovieList()];
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

  // keep track of the index vs the movieList length, and refetch once below 6
  useEffect(() => {
    if (movieList) {
      if ((movieList?.length as number) - currentIndex < 5) {
        setPageNum((prev) => {
          localStorage.setItem("pageNum", String(prev + 1)); // use local storage for pageNum save, keep future loading faster
          return prev + 1;
        });
        setCurrentIndex(0);
      }
    }
  }, [currentIndex, movieList]);

  return { movieListInDeck, handleNext, genrePref };
}

// ==================================================== End of Hook

async function fetchGenrePreference(
  userId: string,
  setGenrePref: React.Dispatch<React.SetStateAction<number[] | undefined>>
) {
  const doc = await db.collection("Users").doc(userId).get();
  const data = doc.data()?.genre_preference;
  if (data && data.length > 0) {
    setGenrePref(data as number[]);
    return data as number[];
  } else {
    setGenrePref(genreList.movie.map((elem) => elem.id));
    return genreList.movie.map((elem) => elem.id);
  }
}

async function getVotedMoviesIds(userId: string) {
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

  const watchedMoviesDoc = await votedMoviesRef.doc("Watched").get();
  if (likedMoviesDoc.exists) {
    const rawData = watchedMoviesDoc.data()?.watched as IWatchedMovieInfo[];
    const data = rawData.map((watchedMovie) => watchedMovie.movieId);
    votedMoviesIds = [...votedMoviesIds, ...data];
  }

  const dislikedMoviesDoc = await votedMoviesRef.doc("Disliked_Movies").get();
  if (dislikedMoviesDoc.exists) {
    const data = dislikedMoviesDoc.data()?.disliked_movies;
    votedMoviesIds = [...votedMoviesIds, ...data];
  }
  return votedMoviesIds;
}

async function fetchPopularMovies(pageNum: number) {
  const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${REACT_APP_TMDB_KEY}&language=en-US&page=${pageNum}`;
  const response: IPopularMovies = await fetch(url).then((res) => res.json());
  return response;
}

function genreFiltering(
  genreIds: number[],
  userPreference: number[] | undefined
) {
  if (userPreference !== undefined) {
    const result = genreIds.map((genreId) => {
      const found = userPreference.includes(genreId);
      if (found) {
        // true is not allowed
        return "pass";
      } else {
        return "fail";
      }
    });
    if (result.includes("pass")) {
      // no true allowed
      return "pass";
    } else {
      return "fail";
    }
  } else return "pass";
}

function GetLocalVoted() {
  const like = localStorage.getItem("liked_movies");
  const dislike = localStorage.getItem("disliked_movies");

  let voted = "";
  if (like) {
    voted = voted + like;
  }
  if (dislike) {
    voted = voted + dislike;
  }

  if (voted !== "") {
    return voted.split(",").map((elem) => Number(elem));
  } else return null;
}
