import { useEffect, useState } from "react";
import { auth, cloudFn, db } from "../firebase/config";

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

      (async function () {
        // document must have fields to be get-able, so I'm querying the deep nested doc
        const doc = await userRef
          .collection("User_Details")
          .doc("Liked_Movies")
          .get(); // check if user's record is in the db
        if (doc.exists) {
          // retrieve all the friends
          const cleanUp = userRef
            .collection("User_Details")
            .doc("Friends")
            .onSnapshot(async (doc) => {
              const data = doc.data();

              // parse friends and requests ID to readable info
              if (data) {
                const friends: string[] = data.friends;
                const pending_received: string[] = data.pending_received;
                const pending_sent: string[] = data.pending_sent;

                // combine all the ids and send it to server, easier to parse this way
                const searchQuery = [
                  ...friends,
                  ...pending_received,
                  ...pending_sent,
                ];

                if (searchQuery.length > 0) {
                  const results = await cloudFn.httpsCallable("userLookUp")({
                    UserIDs: searchQuery,
                  });
                  const UsersInfoLookupResults = results.data;

                  // cloud fn returns array of info, use this function to match with the unorganized info
                  const matchInfoToID = (idArray: string[]) => {
                    return idArray.map((id) => {
                      const found = UsersInfoLookupResults.find(
                        (result: IIdEmail) => result.id === id
                      );

                      return found;
                    });
                  };

                  return setUserProfile({
                    friends: matchInfoToID(friends),
                    pending_received: matchInfoToID(pending_received),
                    pending_sent: matchInfoToID(pending_sent),
                  });
                } else {
                  return setUserProfile(undefined);
                }
              }
            });

          return () => cleanUp();
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
