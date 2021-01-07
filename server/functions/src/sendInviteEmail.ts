import * as functions from "firebase-functions";

export const findAllMatches = functions
  .runWith({ maxInstances: 50 })
  .https.onCall(async (data, context) => {
    if (context.auth) {
    } else
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      );
  });
