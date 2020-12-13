import { db } from "../firebase/config";
import { genrePreference } from "../Helper/variables";
import { IUserAuth, signInError } from "../redux/Auth/AuthReducer";
import { store } from "../store";

export default function newUserDBInit(user: IUserAuth) {
  const docRef = db.collection("users").doc(user.uid);
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
