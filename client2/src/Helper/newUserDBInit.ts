import { db } from "../firebase/config";
import { collectionName } from "../firebase/names";
import { genrePreference } from "../Helper/variables";
import { IUserAuth, signInError } from "../redux/Auth/AuthReducer";
import { IProfileDetails } from "../redux/Profile/profileReducer";
import { store } from "../store";

export default function newUserDBInit(user: IUserAuth) {
  const docRef = db.collection(collectionName.User).doc(user.uid);
  db.runTransaction((transactions) => {
    return transactions.get(docRef).then((doc) => {
      if (!doc.exists) {
        const profile: IProfileDetails = {
          ...user,
          genrePreference: genrePreference.sort(), // sort it to for the update compare function
          mediaListTypePref: {
            media: "tv",
            catagories: "popular",
          },
        };
        // proceed
        docRef.set(profile);
      }
    });
  }).catch((err) => store.dispatch(signInError(err)));
}
