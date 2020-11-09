import { useEffect, useState } from "react";
import { cloudFn } from "../firebase/config";

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
    if (userId && myLikes && myFriends) {
      console.log("getallmatches");
      (async () => {
        const result = await cloudFn.httpsCallable("findAllMatches")({
          myFriends,
          myLikes,
        });
        console.log("result", result);
        setMatches(result.data);
      })();
    }
  }, [userId, myLikes, myFriends]);

  return matches;
}
