import { useContext, useEffect, useState } from "react";
import { db } from "../firebase/config";
import { UserContext } from "../store";

export default function useGetWatchListNotification(userId: string) {
  const [matchDiff, setMatchDiff] = useState(0);
  const { likedMoviesInfos } = useContext(UserContext);

  useEffect(() => {
    if (userId) {
      const cleanUp = db
        .collection("Users")
        .doc(userId)
        .collection("User_Details")
        .doc("Match_Counts")
        .onSnapshot((doc) => {
          const new_match_counts: number = doc.data()?.new_match_counts;
          // const new_match_counts = likedMoviesInfos.filter(
          //   (liked) => liked.matches.length > 0
          // )?.length;
          console.log(new_match_counts);
          const old_match_counts: number = doc.data()?.old_match_counts;

          let diff = new_match_counts - old_match_counts;
          if (diff < 0) {
            diff = 0;
          }
          setMatchDiff(diff);
        });

      return () => cleanUp();
    }
  }, [userId]);
  return matchDiff;
}

export const updateOldMatchCounts = async (userId: string, counts: number) => {
  try {
    await db
      .collection("Users")
      .doc(userId)
      .collection("User_Details")
      .doc("Match_Counts")
      .update({ old_match_counts: counts });
    return;
  } catch (err) {}
};

export const updateNewMatchCounts = async (userId: string, counts: number) => {
  try {
    await db
      .collection("Users")
      .doc(userId)
      .collection("User_Details")
      .doc("Match_Counts")
      .update({ new_match_counts: counts });
    return;
  } catch (err) {}
};
