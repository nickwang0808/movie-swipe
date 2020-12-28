import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { collectionName, db } from ".";

export const sendFriendReq = functions
  .runWith({ maxInstances: 50 })
  .https.onCall(async (data, context) => {
    if (context.auth) {
      const emailToFind = data.email;
      const myInfo = data.myInfo;
      // make sure data format is correct
      if (!(typeof emailToFind === "string") || emailToFind.length === 0) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "The function must be called with " +
            'one arguments "text" containing the message text to add.'
        );
      }

      // make sure user is authenticated
      try {
        const userFound = await admin.auth().getUserByEmail(emailToFind);
        if (userFound) {
          const userFoundUid = userFound.uid;
          const UsersRef = db.collection(collectionName.User);
          // add to receiving user pending receive
          await UsersRef.doc(userFoundUid)
            .collection(collectionName.Received)
            .doc(context.auth.uid)
            .set({
              ...myInfo,
            });
          // return "Friend Reqest Sent!";
          return { message: "Friend invite sent!" };
        } else {
          return { message: "User Not Found" };
        }
      } catch (err) {
        return { message: err.message };
      }
    } else {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      );
    }
  });
