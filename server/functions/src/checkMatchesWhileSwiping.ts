import * as functions from "firebase-functions";
import { arrayUnion, collectionName, db, IVotedMovies } from ".";
import extractProfile from "./HelperFunctions/extractProfile";

export const checkMatchesWhileSwiping = functions.firestore
  .document(
    `${collectionName.User}/{myUid}/${collectionName.Liked}/{likedMovie}`
  )
  .onCreate(async (snap, context) => {
    const myUid: string = context.params.myUid;
    const likedMovie: string = context.params.likedMovie;

    await db.runTransaction(async (t) => {
      const allFriends = db
        .collection(collectionName.User)
        .doc(myUid)
        .collection(collectionName.Friends);
      // get all friends first
      const allFriendsDocs = await t.get(allFriends);

      console.log("checkMatchesWhileSwiping");

      if (allFriendsDocs.empty) return;
      console.log("friends found");

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
      const myProfile = extractProfile(snap.data() as IVotedMovies);

      const myMatches = matchedVotedMovies.map((elem) => extractProfile(elem));

      await Promise.all(
        matchedVotedMovies.map(async (votedMovie) => {
          const batch = db.batch();

          // set friends notification and swap my info in
          batch.update(
            db
              .collection(collectionName.User)
              .doc(votedMovie.uid) // friend's uid
              .collection(collectionName.Liked)
              .doc(String(votedMovie.id)),
            {
              matchedWith: arrayUnion(myProfile),
              timeMatched: Date.now(),
              notify: true,
            }
          );

          // now set friends notification
          batch.set(
            db
              .collection(collectionName.User)
              .doc(votedMovie.uid) // friend's uid
              .collection(collectionName.Notifications)
              .doc(String(votedMovie.id)),
            {
              ...removeProfile(votedMovie),
              matchedWith: [myProfile],
              timeMatched: Date.now(),
            }
          );

          // set my like
          batch.update(
            db
              .collection(collectionName.User)
              .doc(myUid)
              .collection(collectionName.Liked)
              .doc(String(votedMovie.id)),
            {
              matchedWith: arrayUnion(...myMatches),
              timeMatched: Date.now(),
              notify: true,
            }
          );

          // set my notification
          batch.set(
            db
              .collection(collectionName.User)
              .doc(myUid)
              .collection(collectionName.Notifications)
              .doc(String(votedMovie.id)),
            {
              ...removeProfile(votedMovie),
              matchedWith: myMatches,
              timeMatched: Date.now(),
            }
          );

          batch.commit();
          return;
        })
      );
      return;
    });
    return;
  });

function removeProfile(input: any) {
  delete input.displayName;
  delete input.email;
  delete input.isAnonymous;
  delete input.photoURL;
  delete input.uid;
  delete input.genrePreference;

  return input;
}
