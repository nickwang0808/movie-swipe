import * as functions from "firebase-functions";
import { db } from ".";
import arrayChunks from "./HelperFunctions/ArrayChunks";

interface IUserInfo {
  email: string;
  name: string | null;
  uid: string;
}

export interface LikedMovieWithMatches {
  movieId: number;
  matches: string[];
}

const checkMatchesWhileSwiping = functions.https.onCall(
  async (data, context) => {
    if (context.auth) {
      const myUid = context.auth.uid;
      // const getFriends: string[] = await (await db.collection("Users").doc(myUid).collection("User_Details").doc("Friends").get()).data()?.friends
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
          if (querySnapShot.empty) {
            return;
          }
          // look up those users detail
          const friendUidList = querySnapShot.docs.map(
            (doc) => doc.data().uid as string
          );
          await updateMatchToMyDb(myUid, friendUidList, myLike);

          const matchedFriendsInfo = await Promise.all(
            querySnapShot.docs.map(async (doc) => {
              const friendUid = doc.data().uid as string;
              // update like to friend's db
              await updateMatchToFriendDb(myUid, friendUid, myLike);
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

async function updateMatchToMyDb(
  myUid: string,
  friendUid: string[],
  movieId: number
) {
  console.log("run updateMatchToMyDb");

  const myDocRef = db
    .collection("Users")
    .doc(myUid)
    .collection("User_Details")
    .doc("Liked_Movies");

  const liked_movies_matches: LikedMovieWithMatches[] = (
    await myDocRef.get()
  ).data()?.liked_movies_matches;

  const foundIndex = liked_movies_matches.findIndex(
    (elem) => elem.movieId === movieId
  );
  liked_movies_matches[foundIndex].matches.push(...friendUid);
  await myDocRef.update({ liked_movies_matches });
}

async function updateMatchToFriendDb(
  myUid: string,
  friendUid: string,
  movieId: number
) {
  const myDocRef = db
    .collection("Users")
    .doc(friendUid)
    .collection("User_Details")
    .doc("Liked_Movies");

  const liked_movies_matches: LikedMovieWithMatches[] = (
    await myDocRef.get()
  ).data()?.liked_movies_matches;

  const foundIndex = liked_movies_matches.findIndex(
    (elem) => elem.movieId === movieId
  );
  liked_movies_matches[foundIndex].matches.push(myUid);
  await myDocRef.update({ liked_movies_matches });
}
