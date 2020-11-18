import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export default function useGetDislikedMovies(userId: string) {
  const [disliked, setDisliked] = useState<number[]>();

  useEffect(() => {
    if (userId) {
      const cleanUp = db
        .collection("Users")
        .doc(userId)
        .collection("User_Details")
        .doc("Disliked_Movies")
        .onSnapshot((doc) => {
          const disliked_movies = doc.data()?.disliked_movies;
          if (disliked_movies) {
            setDisliked(disliked_movies);
          }
        });

      return () => cleanUp();
    }
  }, [userId]);

  return disliked;
}
