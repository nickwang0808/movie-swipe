import { firestore } from "firebase";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

interface I_User {
  id: string;
  info: {
    first_name: string;
    last_name: string;
  };
  liked_movies: Array<string>;
}

// so every time a like happens, just look thought the group the user is in
// and perform the match check
export default function useGetUser(user_id: string) {
  const [user, setUser] = useState<firestore.DocumentData>();

  // TODO: make this real time

  useEffect(() => {
    const dbRef = db.collection("Users").doc(user_id);
    dbRef.get().then((doc) => {
      if (doc.exists) {
        // console.log("User", doc.data());
        setUser(doc.data());
      } else {
        console.log("document does not exist");
      }
    });
  }, [user_id]);

  return user;
}
