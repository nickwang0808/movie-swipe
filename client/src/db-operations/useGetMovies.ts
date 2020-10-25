import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export default function useGetMovies(userId: string) {
  const [movieList, setMovieList] = useState<any>(); // TODO: need to fix the type here

  const getVotedMoviesIds = async () => {
    let votedMoviesIds: string[] = []; // TODO: this should be number
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
    console.log("fetchPopularMovies -> pageNum", pageNum);

    const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${REACT_APP_TMDB_KEY}&language=en-US&page=${pageNum}`;
    const response = await fetch(url).then((res) => res.json());
    return response;
  };

  useEffect(() => {
    const getMovie = async () => {
      const votedMovies = await getVotedMoviesIds();
      const pageNum: number =
        typeof movieList?.page === "number" ? movieList?.page : 1;

      const movieListUnfiltered = await fetchPopularMovies(pageNum);
      const filteredMovieList = () => {
        let newResults: any[] = []; // TODO: fix type here
        // filter voted movies out
        movieListUnfiltered.results.forEach((result: any) => {
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
      console.log("getMovie -> movieListData", movieListData);
      setMovieList(movieListData);
    };

    if (userId) {
      getMovie();
    }
  }, [userId]);

  return { movieList };
}
