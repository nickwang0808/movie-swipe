import { firestore } from "firebase";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export default function useGetMovies() {
  const [movieList, setMovieList] = useState<any>();

  // useEffect(() => {
  //   db.collection("test-list")
  //     .doc("list-doc")
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         const data = doc.data();
  //         if (data) {
  //           setMovieList(data.movieList.results);
  //         }
  //       } else {
  //         console.log("document does not exist");
  //       }
  //     });
  // }, []);

  useEffect(() => {
    const getMovie = async () => {
      const movieListRef = db.collection("Movie_List");
      const allMovieDocs = movieListRef.get();

      let tempArray: Array<{ id: string }> = [];
      (await allMovieDocs).docs.map((doc) => {
        if (doc.exists) {
          const id = doc.id;
          const movieData = { id, ...doc.data() };
          tempArray.push(movieData);
        } else {
          console.log("can no find docs");
        }
        return;
      });
      setMovieList(tempArray);
    };

    getMovie();
  }, []);

  return { movieList };
}
