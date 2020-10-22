import { db } from "../firebase/config";

export default async function CleanUpMovieList() {
  const testListRef = db.collection("test-list").doc("list-doc");
  const oldCollection = await testListRef.get();
  if (oldCollection.exists) {
    const data = oldCollection.data();
    if (data) {
      const movieList: any[] = data.movieList.results;
      movieList.forEach(async (movie) => {
        const newMovieListRef = db.collection("Movie_List");
        await newMovieListRef.add({
          movie,
        });
      });
    }
  } else {
    console.log("no doc found");
  }
}
