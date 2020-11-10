import { useEffect, useState } from "react";
import searchMovieByID, { MovieDetail } from "../APICalls/searchMovieByID";
import { db } from "../firebase/config";

export interface IWatchedMovieInfo {
  movieId: number;
  watchedWith: string[];
  movieDetails: MovieDetail;
}

export default function useGetLikedMovies(userID: string) {
  const [likedMoviesInfos, setLikedMoviesInfos] = useState<MovieDetail[]>([]);
  const [likedMovieIds, setLikedMovieIds] = useState<string[]>();
  const [watchedMovieInfos, setWatchedMovieInfos] = useState<
    IWatchedMovieInfo[]
  >([]);

  useEffect(() => {
    if (userID) {
      const cleanUp = db
        .collection("Users")
        .doc(userID)
        .collection("User_Details")
        .doc("Liked_Movies")
        .onSnapshot((doc) => {
          if (doc.exists) {
            const data = doc.data();
            if (data) {
              // here we take the fetched id and get the actual movie data
              setLikedMovieIds(data.liked_movies);
              const tempArray: MovieDetail[] = [];
              data.liked_movies.forEach(async (movieID: number) => {
                const movieDetails = await searchMovieByID(movieID);
                tempArray.unshift(movieDetails);
              });
              setLikedMoviesInfos(tempArray);
            } else {
              console.log("doc not found");
            }
          }
        });

      return () => cleanUp();
    }
  }, [userID]);

  useEffect(() => {
    if (userID) {
      const cleanUp = db
        .collection("Users")
        .doc(userID)
        .collection("User_Details")
        .doc("Watched")
        .onSnapshot(async (doc) => {
          if (doc.exists) {
            const data = doc.data();
            if (data) {
              // here we take the fetched id and get the actual movie data
              const watchedResult: IWatchedMovieInfo[] = await Promise.all(
                data.watched.map(
                  async (watched: {
                    movieId: number;
                    watchedWith: string[];
                  }) => {
                    const movieDetails = await searchMovieByID(watched.movieId);
                    return {
                      movieId: watched.movieId,
                      watchedWith: watched.watchedWith,
                      movieDetails: movieDetails,
                    };
                  }
                )
              );
              setWatchedMovieInfos(watchedResult);
            } else {
              console.log("doc not found");
            }
          }
        });

      return () => cleanUp();
    }
  }, [userID]);

  return { likedMoviesInfos, likedMovieIds, watchedMovieInfos };
}
