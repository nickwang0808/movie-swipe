import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// const serviceAccount = require("../secret.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://movie-swipe-82f52.firebaseio.com",
// });
const app = admin.initializeApp({ projectId: "YOUR_PROJECT_ID" });

const db = admin.firestore();
const arrayUnion = admin.firestore.FieldValue.arrayUnion;

export const test = functions.https.onCall(async (data, context) => {
  console.log("test function ran");
  await db.collection("Users").add({ name: "Nick" });
});

export const sendFriendReq = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    console.log("if (context.auth) ");

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
    console.log("currentUserUid", currentUserUid);
    // make sure user is authenticated
    const userFound = await admin.auth(app).getUserByEmail(emailToFind);
    console.log("userFound", userFound);
    if (userFound) {
      console.log("user found");
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
