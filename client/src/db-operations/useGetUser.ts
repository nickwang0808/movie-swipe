import { useEffect, useState } from "react";
import { auth, cloudFn, db } from "../firebase/config";

export interface userInfo {
  id: string;
  email: string;
  name: string;
}

export interface IUserProfile {
  friends: userInfo[];
  pending_received: userInfo[];
  pending_sent: userInfo[];
  friendsIdOnly: string[];
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
                        (result: userInfo) => result.id === id
                      );

                      return found;
                    });
                  };

                  return setUserProfile({
                    friends: matchInfoToID(friends),
                    pending_received: matchInfoToID(pending_received),
                    pending_sent: matchInfoToID(pending_sent),
                    friendsIdOnly: friends,
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
          // console.log("userInfo", userInfo);
          const name = userInfo?.displayName;
          const email = userInfo?.email;
          const uid = userInfo?.uid;
          await userRef.set({
            name: name ? name : email,
            email,
            uid,
            // prettier-ignore
            genre_preference: [28,12,16,35,80,99,18,10751,14,36,27,10402,9648,10749,878,10770,53,10752,37,],
          });

          await userRef
            .collection("User_Details")
            .doc("Liked_Movies")
            .set({
              uid,
              liked_movies:
                localStorage.getItem("liked_movies")?.split(",") || [],
            });
          await userRef
            .collection("User_Details")
            .doc("Disliked_Movies")
            .set({
              disliked_movies:
                localStorage.getItem("disliked_movies")?.split(",") || [],
            });
          await userRef
            .collection("User_Details")
            .doc("Match_Counts")
            .set({ new_match_counts: 0, old_match_counts: 0 });
          await userRef
            .collection("User_Details")
            .doc("Watched")
            .set({ watched: [] });
          await userRef
            .collection("User_Details")
            .doc("Friends")
            .set({ friends: [], pending_sent: [], pending_received: [] });
        }

        localStorage.clear();
      })();
    }
  }, [user_id]);

  return userProfile;
}
