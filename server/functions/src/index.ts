import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const serviceAccount = require("../secret.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://movie-swipe-82f52.firebaseio.com",
});

const db = admin.firestore();
const arrayUnion = admin.firestore.FieldValue.arrayUnion;

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const test = functions.https.onCall((data, context) => {
  console.log("test function ran");
});

export const sendFriendReq = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    const emailToFind = data.email;
    // make sure data format is correct
    if (!(typeof emailToFind === "string") || emailToFind.length === 0) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with " +
          'one arguments "text" containing the message text to add.'
      );
    }

    const currentUserUid = context.auth.uid;
    // make sure user is authenticated
    const userFound = await admin.auth().getUserByEmail(emailToFind);
    if (userFound) {
      const userFoundUid = userFound.uid;
      const UsersRef = db.collection("Users");
      // add to current user pending send
      await UsersRef.doc(currentUserUid)
        .collection("User_Details")
        .doc("Friends")
        .update({
          pending_sent: arrayUnion(userFoundUid),
        });
      // add to receiving user pending receive
      await UsersRef.doc(userFoundUid)
        .collection("User_Details")
        .doc("Friends")
        .update({
          pending_receive: arrayUnion(userFoundUid),
        });
      console.log("friend request sent");
    }
  } else {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }
});
