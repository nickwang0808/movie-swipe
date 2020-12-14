import * as functions from "firebase-functions";
import {
  arrayUnion,
  collectionName,
  db,
  IProfileDetails,
  IVotedMovies,
} from ".";

export const checkMatchesWhileSwiping = functions.firestore
  .document(
    `${collectionName.User}/{myUid}/${collectionName.Liked}/{likedMovie}`
  )
  .onCreate(async (snap, context) => {
    const myUid: string = context.params.myUid;
    const likedMovie: string = context.params.likedMovie;

    db.runTransaction(async (t) => {
      const allFriends = db
        .collection(collectionName.User)
        .doc(myUid)
        .collection(collectionName.Friends);
      // get all friends first
      const allFriendsDocs = await t.get(allFriends);
      const friendsIds: string[] = [];
      allFriendsDocs.forEach((doc) => {
        const friendId = doc.id;
        friendsIds.push(friendId);
      });

      const query = db
        .collectionGroup(collectionName.Liked)
        .where("uid", "in", friendsIds)
        .where("id", "==", Number(likedMovie));

      const queryDocs = await query.get();

      let matchedVotedMovies: IVotedMovies[] = [];
      queryDocs.forEach((doc) => {
        // grad all matched movies and add to my notifiation
        matchedVotedMovies.push(doc.data() as IVotedMovies);
      });

      // my profile
      const myProfile = (
        await db.collection(collectionName.User).doc(myUid).get()
      ).data() as IProfileDetails;

      const myMatches = matchedVotedMovies.map((elem) => extractProfile(elem));

      await Promise.all(
        matchedVotedMovies.map(async (votedMovie) => {
          // set my like
          await db
            .collection(collectionName.User)
            .doc(myUid)
            .collection(collectionName.Liked)
            .doc(String(votedMovie.id))
            .update({
              matchedWith: arrayUnion(...myMatches),
            });

          // set notification and swap my info in
          await db
            .collection(collectionName.User)
            .doc(votedMovie.uid) // friend's uid
            .collection(collectionName.Liked)
            .doc(String(votedMovie.id))
            .set({
              matchedWith: arrayUnion(myProfile),
            });
        })
      );
    });
  });

function extractProfile(data: IVotedMovies) {
  const {
    displayName,
    email,
    isAnonymous,
    photoURL,
    uid,
    genrePreference,
  } = data;

  return { displayName, email, isAnonymous, photoURL, uid, genrePreference };
}
