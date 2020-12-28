import * as functions from "firebase-functions";
import { collectionName, db } from ".";

export const deleteFriend = functions
  .runWith({ maxInstances: 50 })
  .firestore.document("Users/{myUid}/Friends/{friendUid}")
  .onDelete(async (snap, context) => {
    console.log("test");
    const friendUid = context.params.friendUid as string;
    const myUid = context.params.myUid as string;

    await db
      .collection(collectionName.User)
      .doc(friendUid)
      .collection(collectionName.Friends)
      .doc(myUid)
      .delete();
  });
