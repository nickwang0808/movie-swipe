import { arrayRemove, arrayUnion, cloudFn, db } from "../firebase/config";

export default async function handleWatched(
  userId: string,
  movieId: number,
  watchedWith: string[]
) {
  console.log("watched");
  const batch = db.batch();
  const userRef = db.collection("Users").doc(userId).collection("User_Details");

  await userRef.doc("Watched").update({
    watched: arrayUnion({ movieId, watchedWith: watchedWith }),
  });

  await userRef.doc("Liked_Movies").update({
    liked_movies: arrayRemove(movieId),
  });

  // batch.update(userRef.doc("Watched"), {
  //   watched: arrayUnion({ movieId, watchedWith: watchedWith }),
  // });
  // batch.update(userRef.doc("Liked_Movies"), {
  //   liked_movies: arrayRemove(movieId),
  // });

  // await batch.commit();

  console.log("watchedWith: ", watchedWith);
  const result = await cloudFn.httpsCallable("handleWatched")({
    movieId,
    watchedWith,
  });
  console.log("result", result);
}
