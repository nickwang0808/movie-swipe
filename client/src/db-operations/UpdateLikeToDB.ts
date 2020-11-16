import { firestore } from "firebase/app";
import { arrayRemove, db } from "../firebase/config";
const arrayUnion = firestore.FieldValue.arrayUnion;

/*
this code add the liked movie into the Groups and Users collection.
*/

export default function UpdateLikeToDB(
  userId: string,
  movieID: number,
  isLike: boolean
) {
  const userRef = db.collection("Users").doc(userId).collection("User_Details");

  if (isLike) {
    userRef.doc("Disliked_Movies").update({
      disliked_movies: arrayRemove(movieID),
    });
    userRef.doc("Liked_Movies").update({
      liked_movies: arrayUnion(movieID),
    });
  } else {
    userRef.doc("Liked_Movies").update({
      liked_movies: arrayRemove(movieID),
    });
    userRef.doc("Disliked_Movies").update({
      disliked_movies: arrayUnion(movieID),
    });
  }
}
