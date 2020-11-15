import { useEffect, useState } from "react";
import { cloudFn, db } from "../firebase/config";

export interface IMatches {
  matchedMovie: number;
  friendInfo: IUserInfo[];
}

export interface IUserInfo {
  email: string;
  name: string | null;
  uid: string;
}

export default function useGetAllMatches(
  userId: string | undefined,
  myLikes: string[] | undefined,
  myFriends: string[] | undefined
) {
  const [matches, setMatches] = useState<IMatches[]>();

  useEffect(() => {
    // if (userId && myLikes && myFriends && matches === undefined) {
    if (userId && myLikes && myFriends && myFriends.length > 0) {
      (async () => {
        const result = await cloudFn.httpsCallable("findAllMatches")({
          myFriends,
          myLikes,
        });
        // console.log("result", result);
        setMatches(result.data);
      })();
    }
  }, [userId, myLikes, myFriends]);

  useEffect(() => {
    // if (userId && myLikes && myFriends && matches === undefined) {
    if (matches) {
      (async () => {
        await db
          .collection("Users")
          .doc(userId)
          .collection("User_Details")
          .doc("Match_Counts")
          .update({ new_match_counts: matches.length });
      })();
    }
    // eslint-disable-next-line
  }, [matches]);

  return matches;
}
