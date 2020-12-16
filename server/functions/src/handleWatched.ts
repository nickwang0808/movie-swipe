import * as functions from "firebase-functions";
import { collectionName, db, IProfileDetails, IWatchedMovies } from ".";
import extractProfile from "./HelperFunctions/extractProfile";

// export const handleWatched = functions.firestore
//   .document(`${collectionName.User}/{uid}/${collectionName.Watched}/{movieId}`)
//   .onCreate(async (snap, context) => {
//     const batch = db.batch();

//     const { movieId } = context.params;
//     const watchedMovieInfo = snap.data() as IWatchedMovies;

export const handleWatched = functions.https.onCall(async (data, context) => {
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
    const newProfileIndex = watchedWithProfiles.findIndex(
      (elem) => elem.uid === watchedWithUid
    );
    // swap watchedWith profile out with currentUser
    let swappedTopLevel = swapTopLevelProfile(watchedMovieInfo, newProfile);
    swappedTopLevel.watchedWith[newProfileIndex] = currentUserProfile;
    batch.set(docRef, swappedTopLevel);
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
