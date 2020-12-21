import * as functions from "firebase-functions";
import { arrayRemove, collectionName, db } from ".";
import { IProfileDetails } from "./MovieTypes";

export const acceptRequest = functions.firestore
  .document("Users/{myUid}/Friends/{friendUid}")
  .onCreate(async (snap, context) => {
    console.log("test");
    const userToUpdate = snap.data() as IProfileDetails;

    await db.runTransaction((t) => {
      return t
        .get(db.collection(collectionName.User).doc(context.params.myUid))
        .then((doc) => {
          const data = doc.data();

          db.collection(collectionName.User)
            .doc(userToUpdate.uid)
            .collection(collectionName.Friends)
            .doc(context.params.myUid)
            .set({ ...data });
        });
    });
    return;
  });

export const deleteFriend = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    const friendDocRef = db
      .collection("Users")
      .doc(data.id)
      .collection("User_Details")
      .doc("Friends");
    await friendDocRef.update({
      friends: arrayRemove(context.auth.uid),
    });

    return { message: "Remove Friend Successful" };
  } else {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }
});
