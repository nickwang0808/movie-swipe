import * as functions from "firebase-functions";
import { arrayUnion, db, arrayRemove } from ".";

export const acceptRequest = functions.https.onCall(async (data, context) => {
  if (context.auth) {

    const incomingDocRef = db
      .collection("Users")
      .doc(data.id)
      .collection("User_Details")
      .doc("Friends");
    await incomingDocRef.update({
      pending_sent: arrayRemove(context.auth.uid),
      friends: arrayUnion(context.auth.uid),
    });

    return { message: "Accept Request Successful" };
  } else {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }
});

export const declineRequest = functions.https.onCall(async (data, context) => {
  if (context.auth) {

    const incomingDocRef = db
      .collection("Users")
      .doc(data.id)
      .collection("User_Details")
      .doc("Friends");
    await incomingDocRef.update({
      pending_sent: arrayRemove(context.auth.uid),
    });

    return { message: "Decline Request Successful" };
  } else {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }
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
