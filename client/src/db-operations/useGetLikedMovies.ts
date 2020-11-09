import { useEffect, useState } from "react";
import searchMovieByID, { MovieDetail } from "../APICalls/searchMovieByID";
import { db } from "../firebase/config";

export default function useGetLikedMovies(userID: string) {
  const [likedMoviesInfos, setLikedMoviesInfos] = useState<MovieDetail[]>([]);
  const [likedMovieIds, setLikedMovieIds] = useState<string[]>();

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

  return { likedMoviesInfos, likedMovieIds };
}
