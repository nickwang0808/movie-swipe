import * as functions from "firebase-functions";
import { collectionName, db } from ".";
import extractProfile from "./HelperFunctions/extractProfile";
import { IProfileDetails, IWatchedMovies } from "./MovieTypes";

export const handleWatched = functions
  .runWith({ maxInstances: 50 })
  .https.onCall(async (data, context) => {
    const batch = db.batch();
    const movieId = String(data.movieId);
    const myUid = context.auth?.uid as string;

    const watchedMovieInfo = (
      await db
        .collection(collectionName.User)
        .doc(myUid)
        .collection(collectionName.Watched)
        .doc(movieId)
        .get()
    ).data() as IWatchedMovies;

    // extract current user profile
    const currentUserProfile = extractProfile(watchedMovieInfo);

    // extract all profile in watched with
    const { watchedWith: watchedWithProfiles } = watchedMovieInfo;
    const watchedWithUids = watchedWithProfiles.map((elem) => elem.uid);

    /* loop over all watched with users, swap current user profile out
for new user, then swap out new user profile in watchedWith 
array with current user */
    watchedWithUids.forEach((watchedWithUid) => {
      const docRef = db
        .collection(collectionName.User)
        .doc(watchedWithUid)
        .collection(collectionName.Watched)
        .doc(movieId);

      const newProfile = watchedWithProfiles.find(
        (elem) => elem.uid === watchedWithUid
      ) as IProfileDetails;
      // const newProfileIndex = watchedWithProfiles.findIndex(
      //   (elem) => elem.uid === watchedWithUid
      // );
      const updatedWatchedWith = [
        currentUserProfile,
        ...watchedWithProfiles.filter((elem) => elem.uid !== watchedWithUid),
      ];
      // swap watchedWith profile out with currentUser
      let swappedTopLevel = swapTopLevelProfile(watchedMovieInfo, newProfile);
      // swappedTopLevel.watchedWith[newProfileIndex] = currentUserProfile;
      batch.set(docRef, {
        ...swappedTopLevel,
        watchedWith: updatedWatchedWith,
      });
      batch.delete(
        db
          .collection(collectionName.User)
          .doc(watchedWithUid)
          .collection(collectionName.Liked)
          .doc(movieId)
      );
    });

    await batch.commit();
    return;
  });

function swapTopLevelProfile(
  data: IWatchedMovies,
  newProfile: IProfileDetails
): IWatchedMovies {
  return { ...data, ...newProfile };
}
