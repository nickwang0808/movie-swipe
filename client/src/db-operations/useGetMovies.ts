import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export default function useGetMovies(userId: string) {
  const [movieList, setMovieList] = useState<any>(); // TODO: need to fix the type here

  const getVotedMovies = async () => {
    let votedMoviesIds: string[] = [];
    const votedMoviesRef = db
      .collection("Users")
      .doc(userId)
      .collection("User_Details");

    // TODO: fetch dislike movies
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

  useEffect(() => {
    const getMovie = async () => {
      const votedMovies = await getVotedMovies();

      const movieListRef = db.collection("Movie_List");
      const allMovieDocs = movieListRef.get();

      let tempArray: Array<{ id: string }> = [];
      (await allMovieDocs).docs.forEach((doc) => {
        if (doc.exists) {
          const id = doc.id;
          if (votedMovies.includes(id)) {
            return; // skip if movie is been voted
          }
          const movieData = { id, ...doc.data() };
          tempArray.push(movieData);
        } else {
          console.log("can no find docs");
        }
      });
      setMovieList(tempArray);
    };

    if (userId) {
      getMovie();
    }
  }, [userId]);

  return { movieList };
}
