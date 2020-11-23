import { useEffect, useState } from "react";
import searchMovieByID, { MovieDetail } from "../APICalls/searchMovieByID";
import { cloudFn, db } from "../firebase/config";
import { updateNewMatchCounts } from "./useGetWatchListNotification";

export interface IWatchedMovieInfo {
  movieId: number;
  watchedWith: { email: string; name: string; uid: string }[];
  movieDetails: MovieDetail;
}

export interface MovieDetailWithMatches extends MovieDetail {
  matches: string[];
}

export interface LikedMovieWithMatches {
  movieId: number;
  matches: string[];
}

export default function useGetLikedMovies(userID: string) {
  const [likedMoviesInfos, setLikedMoviesInfos] = useState<
    MovieDetailWithMatches[]
  >([]);
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
        .onSnapshot(async (doc) => {
          if (doc.exists) {
            const data = doc.data();
            if (data) {
              // here we take the fetched id and get the actual movie data
              setLikedMovieIds(data.liked_movies);
              // const tempArray: MovieDetailWithMatches[] = [];
              const tempArray: MovieDetailWithMatches[] = await Promise.all(
                data.liked_movies_matches.map(
                  async (movie: LikedMovieWithMatches) => {
                    return {
                      ...(await searchMovieByID(movie.movieId)),
                      matches: movie.matches,
                    };
                  }
                )
              );
              setLikedMoviesInfos(tempArray);
              updateNewMatchCounts(
                userID,
                tempArray.filter((elem) => elem.matches.length > 0).length
              );
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
                    const watchedWithInfo = await cloudFn.httpsCallable(
                      "userLookUp"
                    )({ UserIDs: watched.watchedWith });

                    return {
                      movieId: watched.movieId,
                      watchedWith: watchedWithInfo.data,
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
