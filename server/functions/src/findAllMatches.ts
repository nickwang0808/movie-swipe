import * as functions from "firebase-functions";
import { db } from ".";
import arrayChunks from "./HelperFunctions/ArrayChunks";

interface result {
  matchedMovie: number;
  friendUid: string[];
}

const findAllMatches = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    const myFriends: string[][] = arrayChunks(data.myFriends, 10);
    const myLikes: number[] = data.myLikes;

    const matchedFriendsLikes: result[] = [];
    await Promise.all(
      myFriends.map(async (chunks) => {
        console.log("chunks", chunks);
        const query = db
          .collectionGroup("User_Details")
          .where("uid", "in", chunks);
        const querySnapShot = await query.get();
        console.log("querySnapShot", querySnapShot.docs);
        querySnapShot.docs.map((doc) => {
          const data = doc.data();
          console.log("data", data);
          const friendsLike: number[] = data.liked_movies;
          const matchedMovies = myLikes.filter((element) =>
            friendsLike.includes(element)
          );
          if (matchedMovies) {
            const friendUid: string = data.uid;
            matchedMovies.forEach((movie) => {
              const foundIndex = matchedFriendsLikes.findIndex(
                (elem) => elem.matchedMovie === movie
              );
              if (foundIndex === -1) {
                matchedFriendsLikes.push({
                  matchedMovie: movie,
                  friendUid: [friendUid],
                });
              } else {
                matchedFriendsLikes[foundIndex].friendUid.push(friendUid);
              }
              return;
            });
          }
          return;
        });
      })
    );
    return matchedFriendsLikes;
  } else {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }
});

export default findAllMatches;
