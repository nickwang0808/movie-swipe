import * as functions from "firebase-functions";
import { collectionName, db } from ".";
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
