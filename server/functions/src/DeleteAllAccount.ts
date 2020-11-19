import * as functions from "firebase-functions";
import { adminAuth } from "./index";

const deleteAllAccount = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    // List batch of users, 1000 at a time.
    adminAuth()
      .listUsers()
      .then(async (listUsersResult) => {
        await Promise.all(
          listUsersResult.users.map(async (userRecord) => {
            await adminAuth().deleteUser(userRecord.uid);
          })
        );
      })
      .catch(function (error) {
        console.log("Error listing users:", error);
      });

    return "Old User Removed";
  } else {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }
});
export default deleteAllAccount;
