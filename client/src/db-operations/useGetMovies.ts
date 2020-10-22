import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export default function useGetMovies() {
  const [movieList, setMovieList] = useState<any>();

  useEffect(() => {
    db.collection("test-list")
      .doc("list-doc")
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data) {
            setMovieList(data.movieList.results);
          }
        } else {
          console.log("document does not exist");
        }
      });
  }, []);

  return { movieList };
}
