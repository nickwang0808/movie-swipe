import { db } from "../firebase/config";
import { collectionName } from "../firebase/names";
import { genrePreference } from "../Helper/variables";
import { IUserAuth, signInError } from "../redux/Auth/AuthReducer";
import { IProfileDetails } from "../redux/Profile/profileReducer";
import { store } from "../store";

export default function newUserDBInit(user: IUserAuth) {
  const docRef = db.collection(collectionName.User).doc(user.uid);
  db.runTransaction(async (t) => {
    const doc = await t.get(docRef);
    if (!doc.exists) {
      const profile: IProfileDetails = {
        ...user,
        genrePreference: genrePreference.sort(), // sort it to for the update compare function
        mediaListTypePref: {
          media: "movie",
          catagories: "popular",
        },
      };
      // proceed
      t.set(docRef, profile);
    }
  }).catch((err) => store.dispatch(signInError(err)));
}

export async function newAnonUserDBInit(uid: string) {
  const docRef = db.collection(collectionName.User).doc(uid);

  const user = {
    displayName: null,
    email: null,
    isAnonymous: true,
    photoURL: null,
    uid,
  };

  await db
    .runTransaction((transactions) => {
      return transactions.get(docRef).then((doc) => {
        if (!doc.exists) {
          const profile: IProfileDetails = {
            ...user,
            genrePreference: genrePreference.sort(), // sort it to for the update compare function
            mediaListTypePref: {
              media: "movie",
              catagories: "popular",
            },
          };
          // proceed
          docRef.set(profile);
        }
      });
    })
    .catch((err) => store.dispatch(signInError(err)));
}

export async function userInfoUpgrade(displayName: string, email: string) {
  const user = {
    displayName,
    email,
    isAnonymous: false,
  };

  const { DisLiked, Liked } = store.getState().voted;
  const uid = store.getState().auth.user?.uid as string;

  const likedIds = Liked?.map((e) => e.id);
  const dislikedIds = DisLiked?.map((e) => e.id);

  const batch = db.batch();
  const docRef = db.collection(collectionName.User).doc(uid);

  batch.update(docRef, { ...user });

  if (likedIds && likedIds.length > 0) {
    likedIds.forEach((movieId) => {
      batch.update(
        docRef.collection(collectionName.Liked).doc(String(movieId)),
        { ...user }
      );
    });
  }
  if (dislikedIds && dislikedIds.length > 0) {
    dislikedIds.forEach((movieId) => {
      batch.update(
        docRef.collection(collectionName.Disliked).doc(String(movieId)),
        { ...user }
      );
    });
  }

  await batch.commit();
}
