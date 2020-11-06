import * as functions from "firebase-functions";
import { arrayUnion, db, arrayRemove } from ".";

export const acceptRequest = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    const myDocRef = db
      .collection("Users")
      .doc(context.auth.uid)
      .collection("User_Details")
      .doc("Friends");
    await myDocRef.update({
      pending_received: arrayRemove(data.id),
      friends: arrayUnion(data.id),
    });

    const incomingDocRef = db
      .collection("Users")
      .doc(data.id)
      .collection("User_Details")
      .doc("Friends");
    await incomingDocRef.update({
      pending_sent: arrayRemove(context.auth.uid),
      friends: arrayUnion(context.auth.uid),
    });

    return "success";
  } else {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }
});

export const declineRequest = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    const myDocRef = db
      .collection("Users")
      .doc(context.auth.uid)
      .collection("User_Details")
      .doc("Friends");
    await myDocRef.update({
      pending_received: arrayRemove(data.id),
    });

    const incomingDocRef = db
      .collection("Users")
      .doc(data.id)
      .collection("User_Details")
      .doc("Friends");
    await incomingDocRef.update({
      pending_sent: arrayRemove(context.auth.uid),
    });

    return "success";
  } else {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }
});
