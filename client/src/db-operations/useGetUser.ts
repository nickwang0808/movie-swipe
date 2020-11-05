import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";

export interface IIdEmail {
  id: string;
  email: string;
}

export interface IUserProfile {
  friends: IIdEmail[];
  pending_received: IIdEmail[];
  pending_sent: IIdEmail[];
}

export default function useGetUser(user_id: string) {
  // eslint-disable-next-line
  const [userProfile, setUserProfile] = useState<IUserProfile>();

  useEffect(() => {
    if (user_id) {
      const userRef = db.collection("Users").doc(user_id);
      // first time user init
      (async function () {
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

          // TODO: make this real time, and the looks up fn to server
          const data = doc.data();
          if (data) {
            const friends: string[] = data.friends;
            const friendsArray: IIdEmail[] = [];
            if (friends.length > 0) {
              friends.forEach(async (id) => {
                const doc = await db.collection("Users").doc(id).get();
                if (doc.exists) {
                  const data = doc.data();
                  if (data) {
                    friendsArray.push({ email: data.email, id: data.uid });
                  }
                }
              });
            }

            const pending_received: string[] = data.pending_received;
            const pending_receivedArray: IIdEmail[] = [];
            if (pending_received.length > 0) {
              pending_received.forEach(async (id) => {
                const doc = await db.collection("Users").doc(id).get();
                if (doc.exists) {
                  const data = doc.data();
                  if (data) {
                    pending_receivedArray.push({
                      email: data.email,
                      id: data.uid,
                    });
                  }
                }
              });
            }

            const pending_sent: string[] = data.pending_sent;
            const pending_sentArray: IIdEmail[] = [];
            if (pending_sent.length > 0) {
              pending_sent.forEach(async (id) => {
                const doc = await db.collection("Users").doc(id).get();
                if (doc.exists) {
                  const data = doc.data();
                  if (data) {
                    pending_sentArray.push({ email: data.email, id: data.uid });
                  }
                }
              });
            }

            setUserProfile({
              friends: friendsArray,
              pending_received: pending_receivedArray,
              pending_sent: pending_sentArray,
            });
          }
        } else if (!doc.exists) {
          // if no user found in db, init docs for them
          // console.log("init user create");
          const userInfo = auth.currentUser;
          console.log("userInfo", userInfo);
          const name = userInfo?.displayName;
          const email = userInfo?.email;
          const uid = userInfo?.uid;
          await userRef.set({ name, email, uid });

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
            .set({ friends: [], pending_sent: [], pending_received: [] });
        }
      })();
    }
  }, [user_id]);

  return userProfile;
}
