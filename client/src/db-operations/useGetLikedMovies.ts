import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export default function useGetLikedMovies(userID: string) {
  const [likedMoviesInfos, setLikedMoviesInfos] = useState<
    firebase.firestore.DocumentData[]
  >([]);

  useEffect(() => {
    if (userID) {
      const searchMovieByID = async (ID: string) => {
        const movieRef = db.collection("Movie_List").doc(ID);
        const doc = await movieRef.get();
        if (doc.exists) {
          const id = doc.id;
          const movie = doc.data();
          setLikedMoviesInfos((prev) => [...prev, { id, movie }]);
        } else {
          console.log("no doc found");
        }
      };

      const userRef = db
        .collection("Users")
        .doc(userID)
        .collection("User_Details")
        .doc("Liked_Movies")
        .onSnapshot((doc) => {
          if (doc.exists) {
            const data = doc.data();
            if (data) {
              // here we take the fetched id and get the actual movie data
              data.liked_movies.forEach(async (movieID: string) => {
                await searchMovieByID(movieID);
              });
            } else {
              console.log("doc not found");
            }
          }
        });

      return () => userRef();
    }
  }, [userID]);

  return likedMoviesInfos;
}
