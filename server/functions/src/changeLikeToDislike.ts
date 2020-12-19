import * as functions from "firebase-functions";
import { db, LikedMovieWithMatches } from ".";

export const changeLikeToDislike = functions.https.onCall(
  async (data, context) => {
    if (context.auth) {
      const myUid = context.auth.uid;
      const matches: string[] = data.matches;
      const movieId: number = data.movieId;

      await Promise.all(
        matches.map(async (match) => {
          await removeMatch(match, myUid, movieId);
        })
      );

      return;
    } else {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      );
    }
  }
);

// userId is the user record being updated
async function removeMatch(userId: string, friendUid: string, movieId: number) {
  const userRef = db
    .collection("Users")
    .doc(userId)
    .collection("User_Details")
    .doc("Liked_Movies");

  const liked_movies_matches: LikedMovieWithMatches[] = (
    await userRef.get()
  ).data()?.liked_movies_matches;

  const foundIndex = liked_movies_matches.findIndex(
    (elem) => elem.movieId === movieId
  );
  liked_movies_matches[foundIndex].matches = liked_movies_matches[
    foundIndex
  ].matches.filter((elem) => elem !== friendUid);

  await userRef.update({ liked_movies_matches });
}
