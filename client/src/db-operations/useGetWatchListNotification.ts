import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export default function useGetWatchListNotification(userId: string) {
  const [matchDiff, setMatchDiff] = useState(0);

  useEffect(() => {
    if (userId) {
      const cleanUp = db
        .collection("Users")
        .doc(userId)
        .collection("User_Details")
        .doc("Match_Counts")
        .onSnapshot((doc) => {
          const new_match_counts: number = doc.data()?.new_match_counts;
          const old_match_counts: number = doc.data()?.old_match_counts;
          console.log(
            "useGetWatchListNotification -> old_match_counts",
            old_match_counts
          );
          console.log(
            "useGetWatchListNotification -> new_match_counts",
            new_match_counts
          );

          if (new_match_counts && old_match_counts) {
            const diff = new_match_counts - old_match_counts;
            setMatchDiff(diff);
          }
        });

      return () => cleanUp();
    }
  }, [userId]);
  return matchDiff;
}

export const updateOldMatchCounts = async (userId: string, counts: number) => {
  await db
    .collection("Users")
    .doc(userId)
    .collection("User_Details")
    .doc("Match_Counts")
    .update({ old_match_counts: counts });
  return;
};
