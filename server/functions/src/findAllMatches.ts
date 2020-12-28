import * as functions from "firebase-functions";
import { arrayUnion, collectionName, db } from ".";
import arrayChunks from "./HelperFunctions/ArrayChunks";
import extractProfile from "./HelperFunctions/extractProfile";
import { IVotedMovies, IVotedMTvs } from "./MovieTypes";

export const findAllMatches = functions
  .runWith({ maxInstances: 50 })
  .https.onCall(async (data, context) => {
    if (context.auth) {
      const friendUid = data.friendUid as string;
      const myUid = context.auth.uid;
      const myMovieIds = data.movieIds as number[];

      const likeChunks = arrayChunks(myMovieIds, 10);

      db.runTransaction(async (t) => {
        const allMatchedDocs: (IVotedMTvs | IVotedMovies)[] = [];
        // get all matched movie docs
        await Promise.all(
          likeChunks.map(async (chunk) => {
            const query = db
              .collectionGroup(collectionName.Liked)
              .where("id", "in", chunk);

            const docs = await t.get(query);
            docs.forEach((doc) => {
              allMatchedDocs.push(doc.data() as IVotedMTvs | IVotedMovies);
            });
            return;
          })
        );

        if (allMatchedDocs.length === 0) return;

        // get my profile and friend profile
        const myProfile = (
          await t.get(db.collection(collectionName.User).doc(myUid))
        ).data();
        const friendProfile = extractProfile(allMatchedDocs[0]);

        // start adding each other in matches
        await Promise.all(
          allMatchedDocs.map(async (matchedDoc) => {
            t.update(
              db
                .collection(collectionName.User)
                .doc(friendUid)
                .collection(collectionName.Liked)
                .doc(String(matchedDoc.id)),
              {
                matchedWith: arrayUnion(myProfile),
                notify: true,
                timeMatched: Date.now(),
              }
            );
            t.update(
              db
                .collection(collectionName.User)
                .doc(myUid)
                .collection(collectionName.Liked)
                .doc(String(matchedDoc.id)),
              {
                matchedWith: arrayUnion(friendProfile),
                notify: true,
                timeMatched: Date.now(),
              }
            );

            return;
          })
        );
      });

      return;
    } else {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      );
    }
  });
