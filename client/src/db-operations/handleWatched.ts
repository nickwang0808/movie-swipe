import { arrayRemove, arrayUnion, cloudFn, db } from "../firebase/config";
import removeLiked from "../HelperFunctions/removedLiked";

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

  console.log("watchedWith: ", watchedWith);
  const result = await cloudFn.httpsCallable("handleWatched")({
    movieId,
    watchedWith,
  });
  console.log("result", result);
  // remove like the last so we gave teh animation sometime so it wont flick
  await removeLiked(userId, movieId);
}
