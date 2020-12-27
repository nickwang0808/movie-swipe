import { useEffect } from "react";
import { useDispatch } from "react-redux";
import sortByLikedAndMatched from "../../Helper/sortByLikedAndMatched";
import { IVotedMovies } from "../../MovieTypes";
import { setNotification } from "../../redux/Notification/notificationReducer";
import { store } from "../../store";
import { db } from "../config";
import { collectionName } from "../names";

export default function useNotificationListener() {
  const uid = store.getState().auth.user?.uid as string;
  const userRef = db.collection(collectionName.User).doc(uid);
  const dispatch = useDispatch();
  useEffect(() => {
    const cleanUp = userRef
      .collection(collectionName.Notifications)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data()) as IVotedMovies[];
        dispatch(setNotification(data.sort(sortByLikedAndMatched)[0]));
      });

    return () => cleanUp();
  }, []);
}
