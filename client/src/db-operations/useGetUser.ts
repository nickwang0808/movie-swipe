import { firestore } from "firebase";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export interface IUserProfile {
  friends: string[];
}

export default function useGetUser(user_id: string) {
  // eslint-disable-next-line
  const [userProfile, setUserProfile] = useState<IUserProfile>();

  useEffect(() => {
    const userRef = db.collection("Users").doc(user_id);
    // first time user init
    (async function () {
      if (user_id) {
        // document must have fields to be get-able, so I'm querying the deep nested doc
        const doc = await userRef
          .collection("User_Details")
          .doc("Liked_Movies")
          .get();
        if (doc.exists) {
          // retrieve all the friends
          const doc = await userRef
            .collection("User_Details")
            .doc("Friends")
            .get();
          const data = doc.data();
          if (data) {
            setUserProfile({ ...data.friends });
          }
        } else if (!doc.exists) {
          // if no user found in db, create empty docs for them
          // console.log("init user create");
          userRef
            .collection("User_Details")
            .doc("Liked_Movies")
            .set({ liked_movies: [] });
          userRef
            .collection("User_Details")
            .doc("Disliked_Movies")
            .set({ disliked_movies: [] });
          userRef
            .collection("User_Details")
            .doc("Friends")
            .set({ friends: [] });
        }
      }
    })();
  }, [user_id]);

  return userProfile;
}
