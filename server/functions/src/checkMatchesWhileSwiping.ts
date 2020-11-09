import * as functions from "firebase-functions";
import { db } from ".";
import arrayChunks from "./HelperFunctions/ArrayChunks";

interface IUserInfo {
  email: string;
  name: string | null;
  uid: string;
}

const checkMatchesWhileSwiping = functions.https.onCall(
  async (data, context) => {
    if (context.auth) {
      const myFriends: string[][] = arrayChunks(data.myFriends, 10);
      const myLike: number = data.myLike;

      const matchedFriends: IUserInfo[] = [];
      // find all user that liked the movie
      await Promise.all(
        myFriends.map(async (chunks) => {
          const query = db
            .collectionGroup("User_Details")
            .where("uid", "in", chunks)
            .where("liked_movies", "array-contains", myLike);
          const querySnapShot = await query.get();
          // look up those users detail
          const matchedFriendsInfo = await Promise.all(
            querySnapShot.docs.map(async (doc) => {
              const friendUid = doc.data().uid as string;
              const userInfoDoc = await db
                .collection("Users")
                .doc(friendUid)
                .get();
              const data = userInfoDoc.data();
              const email = data?.email as string;
              const name = data?.name as string | null;
              const uid = data?.uid as string;
              console.log("doc", doc.data());
              return { email, name, uid };
            })
          );
          matchedFriends.push(...matchedFriendsInfo);
        })
      );

      console.log("matchedFriendsLikes", matchedFriends);
      return matchedFriends;
    } else {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      );
    }
  }
);

export default checkMatchesWhileSwiping;

// const email = doc.data().email as string;
// const name = doc.data().name as string | null;
// const uid = doc.data().uid as string;
// console.log("doc", doc.data());

// return { email, name, uid };
