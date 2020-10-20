import { firestore } from "firebase";
import { db } from "../firebase/config";
const batch = db.batch();
const arrayUnion = firestore.FieldValue.arrayUnion;

/*
this code add the liked movie into the Groups and Users collection.
*/

export const UpdateLikeToDB = (
  user: firestore.DocumentData,
  movieTitle: string
) => {
  const userRef = db.collection("Users").doc(user.id);
  const userCurrentGroups: string[] = user.groups;

  userRef.update({
    liked_movies: arrayUnion(movieTitle),
  });

  userCurrentGroups.forEach((group) => {
    db.runTransaction((transaction) => {
      const groupRef = db.collection("Groups").doc(group);
      return transaction.get(groupRef).then((groupDoc) => {
        if (!groupDoc.exists) {
          throw "no such doc";
        }
        const docData = groupDoc.data();
        if (docData) {
          const findMovie = (likedMovie: any) => {
            return likedMovie.movie_title === movieTitle;
          };
          // use find to make sure the movie is not already liked by other group member
          // if ok, add the movie and current user in
          if (!docData.liked_movies.find(findMovie)) {
            transaction.update(groupRef, {
              liked_movies: arrayUnion({
                movie_title: movieTitle,
                users: [user.id],
              }),
            });
          } else {
            /* TODO: also need to trigger the cloud function to inform other users
            who liked the movie about the match */

            // modify existing liked_movies and add the user in it
            const index = docData.liked_movies.indexOf(
              docData.liked_movies.find(findMovie)
            );
            let liked_moviesCopy = [...docData.liked_movies];
            liked_moviesCopy[index] = {
              ...liked_moviesCopy[index],
              users: [...liked_moviesCopy[index].users, user.id],
            };
            // update the document
            transaction.update(groupRef, {
              liked_movies: liked_moviesCopy,
            });
          }
        }
      });
    });
  });
};
