import * as functions from "firebase-functions";
import { db } from ".";
import arrayChunks from "./HelperFunctions/ArrayChunks";

interface IUserInfo {
  email: string;
  name: string | null;
  uid: string;
}

interface result {
  matchedMovie: number;
  friendInfo: IUserInfo[];
}

const findAllMatches = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    const myFriends: string[][] = arrayChunks(data.myFriends, 10);
    const myLikes: number[] = data.myLikes;

    const matchedFriendsLikes: result[] = [];
    await Promise.all(
      myFriends.map(async (chunks) => {
        const query = db
          .collectionGroup("User_Details")
          .where("uid", "in", chunks);
        const querySnapShot = await query.get();
        await Promise.all(
          querySnapShot.docs.map(async (doc) => {
            const data = doc.data();
            const friendsLike: number[] = data.liked_movies;
            const matchedMovies = myLikes.filter((element) =>
              friendsLike.includes(element)
            );
            if (matchedMovies) {
              const friendUid: string = data.uid;
              const userInfoDoc = await db
                .collection("Users")
                .doc(friendUid)
                .get();
              const userDetails = userInfoDoc.data();

              matchedMovies.forEach((movie) => {
                const foundIndex = matchedFriendsLikes.findIndex(
                  (elem) => elem.matchedMovie === movie
                );
                if (foundIndex === -1) {
                  matchedFriendsLikes.push({
                    matchedMovie: movie,
                    friendInfo: [userDetails as IUserInfo],
                  });
                } else {
                  matchedFriendsLikes[foundIndex].friendInfo.push(
                    userDetails as IUserInfo
                  );
                }
                return;
              });
            }
            return;
          })
        );
      })
    );

    console.log("matchedFriendsLikes", matchedFriendsLikes);
    return matchedFriendsLikes;
  } else {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }
});

export default findAllMatches;
