import { db } from "../firebase/config";
import { collectionName } from "../firebase/names";
import { genrePreference } from "../Helper/variables";
import { IUserAuth, signInError } from "../redux/Auth/AuthReducer";
import { store } from "../store";

export default function newUserDBInit(user: IUserAuth) {
  const docRef = db.collection(collectionName.User).doc(user.uid);
  db.runTransaction((transactions) => {
    return transactions.get(docRef).then((doc) => {
      if (!doc.exists) {
        // proceed
        docRef.set({
          ...user,
          genrePreference,
        });
      }
    });
  }).catch((err) => store.dispatch(signInError(err)));
}
