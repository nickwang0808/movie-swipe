import { firestore } from "firebase";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export default function useGetUser(user_id: string) {
  const [userProfile, setUserProfile] = useState<firestore.DocumentData>();

  useEffect(() => {
    (async function () {
      if (user_id) {
        const userRef = db.collection("Users").doc(user_id);
        const doc = await userRef.get();
        if (!doc.exists) {
          // if no user found in db, create empty doc for them
          const newUserDbRef = db.collection("Users").doc(user_id);
          db.batch().set(
            newUserDbRef.collection("User_Details").doc("Liked_Movies"),
            { liked_movies: [] }
          );
          db.batch().set(
            newUserDbRef.collection("User_Details").doc("Groups"),
            { groups: [] }
          );
        } else if (doc.exists) {
          // TODO: get groups
        }
      }
    })();
  }, [user_id]);

  return userProfile;
}
