import { useEffect, useState } from "react";
import deleteNotification from "../firebase/firestoreOperations/deleteNotification";
import { IVotedMovies } from "../MovieTypes";

export default function useMatchModalControl(
  notification: IVotedMovies | null
) {
  const [showModal, setShowModal] = useState(Boolean(notification));
  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setShowModal(false);
        deleteNotification(String(notification?.id as number));
      }, 5000);
    }
  }, [notification, showModal]);

  return { showModal, setShowModal };
}
