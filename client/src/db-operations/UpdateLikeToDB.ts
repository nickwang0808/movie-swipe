import { firestore } from "firebase/app";
import { arrayRemove, db } from "../firebase/config";
const arrayUnion = firestore.FieldValue.arrayUnion;

/*
this code add the liked movie into the Groups and Users collection.
*/

export default async function UpdateLikeToDB(
  userId: string,
  movieID: number,
  isLike: boolean
) {
  const userRef = db.collection("Users").doc(userId).collection("User_Details");

  console.log("update");

  if (isLike) {
    await userRef.doc("Liked_Movies").update({
      liked_movies: arrayUnion(movieID),
      liked_movies_matches: arrayUnion({ movieId: movieID, matches: [] }),
    });
    userRef.doc("Disliked_Movies").update({
      disliked_movies: arrayRemove(movieID),
    });
  } else {
    await userRef.doc("Disliked_Movies").update({
      disliked_movies: arrayUnion(movieID),
    });
    userRef.doc("Liked_Movies").update({
      //TODO: update the object
      liked_movies: arrayRemove(movieID),
    });
  }
}
