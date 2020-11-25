import { arrayUnion, cloudFn, db } from "../firebase/config";
import removeLiked from "../HelperFunctions/removedLiked";

export default async function handleWatched(
  userId: string,
  movieId: number,
  watchedWith: string[]
) {
  const userRef = db.collection("Users").doc(userId).collection("User_Details");

  await userRef.doc("Watched").update({
    watched: arrayUnion({ movieId, watchedWith: watchedWith }),
  });

  await cloudFn.httpsCallable("handleWatched")({
    movieId,
    watchedWith,
  });
  // remove like the last so we gave the animation sometime so it wont flick
  await removeLiked(userId, movieId);
}
