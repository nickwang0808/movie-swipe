import { useEffect } from "react";
import { useDispatch } from "react-redux";
import sortByLikedAndMatched from "../../Helper/sortByLikedAndMatched";
import { IVotedMovies } from "../../MovieTypes/IPopularMovies";
import { setNotification } from "../../redux/Notification/notificationReducer";
import {
  setDisLiked,
  setLiked,
  setWatched,
} from "../../redux/Voted/votedMovieReducer";
import { store } from "../../store";
import { db } from "../config";
import { collectionName } from "../names";

export default function useVotedMovieListener() {
  const dispatch = useDispatch();
  const uid = store.getState().auth.user?.uid as string;
  const userRef = db.collection(collectionName.User).doc(uid);
  useEffect(() => {
    const cleanUp = userRef
      .collection(collectionName.Liked)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data()) as IVotedMovies[];
        dispatch(setLiked(data));
      });

    return () => cleanUp();
  }, []);

  useEffect(() => {
    const cleanUp = userRef
      .collection(collectionName.Disliked)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data()) as IVotedMovies[];
        dispatch(setDisLiked(data));
      });

    return () => cleanUp();
  }, []);

  useEffect(() => {
    const cleanUp = userRef
      .collection(collectionName.Watched)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data()) as IVotedMovies[];
        dispatch(setWatched(data));
      });

    return () => cleanUp();
  }, []);

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
