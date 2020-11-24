import * as functions from "firebase-functions";
import { arrayUnion, db, arrayRemove } from ".";
import { LikedMovieWithMatches } from "./checkMatchesWhileSwiping";

export const handleWatched = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    const userId = context.auth.uid;
    const movieId = data.movieId as number;
    const myWatchedWith = data.watchedWith as string[];
    console.log("matchedWith", myWatchedWith);
    await Promise.all(
      myWatchedWith.map(async (friendId) => {
        const userRef = db
          .collection("Users")
          .doc(friendId)
          .collection("User_Details");
        await userRef.doc("Liked_Movies").update({
          liked_movies: arrayRemove(movieId),
        });
        const watchedWith = [
          ...myWatchedWith.filter((id) => id !== friendId),
          userId,
        ];
        await userRef.doc("Watched").update({
          watched: arrayUnion({ movieId, watchedWith }),
        });

        const oldLikes: LikedMovieWithMatches[] = (
          await userRef.doc("Liked_Movies").get()
        ).data()?.liked_movies_matches;
        const newLikes = oldLikes.filter((elem) => elem.movieId !== movieId);
        await userRef.doc("Liked_Movies").update({
          liked_movies_matches: newLikes,
          liked_movies: arrayRemove(movieId),
        });
      })
    );

    return;
  } else {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }
});

export default handleWatched;
