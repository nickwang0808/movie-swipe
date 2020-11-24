import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const db = admin.firestore();

const userLookUp = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    const IDsToLookUp: string[] = data.UserIDs;
    // console.log("IDsToLookUp", IDsToLookUp);

    if (IDsToLookUp.length > 0) {
      return await Promise.all(
        IDsToLookUp.map(async (id) => {
          const doc = await db.collection("Users").doc(id).get();
          const data = doc.data();

          if (data) {
            // console.log("data", data);
            return { email: data?.email, uid: data?.uid, name: data?.name };
          } else {
            throw new functions.https.HttpsError(
              "failed-precondition",
              "no doc found"
            );
          }
        })
      );
    } else {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "no user to look up."
      );
    }
  } else {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }
});

export default userLookUp;
