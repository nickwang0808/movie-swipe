import * as functions from "firebase-functions";
import { adminAuth } from ".";
const firebase_tools = require("firebase-tools");

const deleteAccount = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    const accountToDelete: string = data.accountToDelete;
    console.log("accountToDelete", accountToDelete);
    try {
      await adminAuth().deleteUser(accountToDelete);

      await firebase_tools.firestore.delete(`/Users/${accountToDelete}`, {
        project: "movie-swipe-82f52",
        recursive: true,
        yes: true,
        token: functions.config().fb.token,
      });
    } catch (err) {
      console.log(err);
    }
    return "Old User Removed";
  } else {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }
});
export default deleteAccount;