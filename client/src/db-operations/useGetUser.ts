import { firestore } from "firebase";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export default function useGetUser(user_id: string) {
  const [userProfile, setUserProfile] = useState<firestore.DocumentData>();

  useEffect(() => {
    (async function () {
      if (user_id) {
        const userRef = db.collection("Users").doc(user_id);

        // document must have fields to be get-able, so I'm querying the deep nested doc
        const doc = await userRef
          .collection("User_Details")
          .doc("Liked_Movies")
          .get();
        if (doc.exists) {
          // TODO: get groups
          console.log("user exist");
        } else if (!doc.exists) {
          // if no user found in db, create empty docs for them
          console.log("init user create");
          userRef
            .collection("User_Details")
            .doc("Liked_Movies")
            .set({ liked_movies: [] });
          userRef
            .collection("User_Details")
            .doc("Disliked_Movies")
            .set({ disliked_movies: [] });
          userRef.collection("User_Details").doc("Groups").set({ groups: [] });
        }
      }
    })();
  }, [user_id]);

  return userProfile;
}

// for some reason batch didn't work here
// db.batch().set(
//   userRef.collection("User_Details").doc("Liked_Movies"),
//   { liked_movies: [] }
// );
// db.batch().set(
//   userRef.collection("User_Details").doc("DisLiked_Movies"),
//   { disliked_movies: [] }
// );
// db.batch().set(userRef.collection("User_Details").doc("Groups"), {
//   groups: [],
// });
