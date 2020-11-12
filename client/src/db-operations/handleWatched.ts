import { arrayRemove, arrayUnion, cloudFn, db } from "../firebase/config";

export default async function handleWatched(
  userId: string,
  movieId: number,
  watchedWith: string[]
) {
  console.log("watched");
  const userRef = db.collection("Users").doc(userId).collection("User_Details");
  userRef.doc("Liked_Movies").update({
    liked_movies: arrayRemove(movieId),
  });
  userRef.doc("Watched").update({
    watched: arrayUnion({ movieId, watchedWith: watchedWith }),
  });
  console.log("watchedWith: ", watchedWith);
  const result = await cloudFn.httpsCallable("handleWatched")({
    movieId,
    watchedWith,
  });
  console.log("result", result);
}
