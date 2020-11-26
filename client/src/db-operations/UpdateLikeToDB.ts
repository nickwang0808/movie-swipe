import { firestore } from "firebase/app";
import { arrayRemove, db } from "../firebase/config";
import removeLiked from "../HelperFunctions/removedLiked";
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

  if (isLike) {
    await userRef.doc("Liked_Movies").update({
      liked_movies: arrayUnion(movieID),
      liked_movies_matches: arrayUnion({
        movieId: movieID,
        matches: [],
        like_time: Date.now(),
        match_time: null,
      }),
    });
    userRef.doc("Disliked_Movies").update({
      disliked_movies: arrayRemove(movieID),
    });
  } else {
    await userRef.doc("Disliked_Movies").update({
      disliked_movies: arrayUnion(movieID),
    });
    await removeLiked(userId, movieID);
  }
}
