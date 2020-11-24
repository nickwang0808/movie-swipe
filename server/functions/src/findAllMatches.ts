import * as functions from "firebase-functions";
import { db } from ".";

export interface LikedMovieWithMatches {
  movieId: number;
  matches: string[];
}

const findAllMatches = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    const myUid = context.auth.uid;
    const friendUid = data.friendUid;
    const myLikes = data.myLikes;

    const friendsLike = await getFriendLikes(friendUid);
    if (friendsLike.length === 0) return;

    const matchedMovie = checkMatches(myLikes, friendsLike);
    if (matchedMovie.length === 0) return;

    await updateMatch(myUid, friendUid, matchedMovie);
    await updateMatch(friendUid, myUid, matchedMovie);

    return;
  } else {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }
});

export default findAllMatches;

async function updateMatch(
  userId: string,
  friendId: string,
  movieList: number[]
) {
  const userRef = db
    .collection("Users")
    .doc(userId)
    .collection("User_Details")
    .doc("Liked_Movies");

  let liked_movies_matches: LikedMovieWithMatches[] = (
    await userRef.get()
  ).data()?.liked_movies_matches;

  await Promise.all(
    movieList.map(async (movieId) => {
      const foundIndex = liked_movies_matches.findIndex(
        (elem) => elem.movieId === movieId
      );
      liked_movies_matches[foundIndex].matches.push(friendId);
      return;
    })
  );

  userRef.update({ liked_movies_matches });
}

function checkMatches(myLikes: number[], friendLikes: number[]) {
  let tempArray: number[] = [];
  myLikes.forEach((myLike) => {
    if (friendLikes.includes(myLike)) {
      tempArray.push(myLike);
    }
    return;
  });
  return tempArray;
}

async function getFriendLikes(uid: string) {
  const userRef = db
    .collection("Users")
    .doc(uid)
    .collection("User_Details")
    .doc("Liked_Movies");
  const friendLikes: number[] = (await userRef.get()).data()?.liked_movies;
  return friendLikes;
}
