import { useEffect } from "react";
import deleteNotification from "../firebase/firestoreOperations/deleteNotification";
import { IVotedMovies } from "../MovieTypes";

export default function useMatchModalControl(
  notification: IVotedMovies | null
) {
  const delNotificationHOF = () =>
    deleteNotification(String(notification?.id as number));

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        delNotificationHOF();
      }, 5000);
    }
  }, [notification]);

  return delNotificationHOF;
}
