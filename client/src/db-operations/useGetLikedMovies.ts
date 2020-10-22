import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export default function useGetLikedMovies(userID: string) {
  const [likedMoviesInfos, setLikedMoviesInfos] = useState<
    firebase.firestore.DocumentData[]
  >([]);

  useEffect(() => {
    let tempArray: Array<firebase.firestore.DocumentData> = [];

    const searchMovieByID = async (ID: string) => {
      const movieRef = db.collection("Movie_List").doc(ID);
      const doc = await movieRef.get();
      if (doc.exists) {
        const id = doc.id;
        const movie = doc.data();
        // tempArray.push({ id, movie });
        // console.log("temparray lenght: ", tempArray.length);
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
            // console.log("temparray", tempArray);
            //   setLikedMoviesInfos(tempArray);
            // console.log("likedmovieinfos", likedMoviesInfos);
          } else {
            console.log("doc not found");
          }
        }
      });

    // after all done, push the temparray to state

    return () => userRef();
  }, [userID]);

  return likedMoviesInfos;
}
