import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { IVotedMovies, IWatchedMovies } from "../../MovieTypes";
import {
  setFriends,
  setReceived,
  setSent,
} from "../../redux/Friends/friendsReducer";
import {
  IProfileDetails,
  setProfile,
} from "../../redux/Profile/profileReducer";
import {
  setDisLiked,
  setLiked,
  setWatched,
} from "../../redux/Voted/votedMovieReducer";
import { store } from "../../store";
import { db } from "../config";
import { collectionName } from "../names";

export default function useAllListener() {
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

    const cleanUp2 = userRef
      .collection(collectionName.Disliked)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data()) as IVotedMovies[];
        dispatch(setDisLiked(data));
      });

    const cleanUp3 = userRef
      .collection(collectionName.Watched)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data()) as IWatchedMovies[];
        dispatch(setWatched(data));
      });

    const cleanUp5 = userRef.onSnapshot((snap) => {
      const data = snap.data() as IProfileDetails;
      dispatch(setProfile(data));
    });

    const cleanUp6 = userRef
      .collection(collectionName.Friends)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data()) as IProfileDetails[];
        dispatch(setFriends(data));
      });

    const cleanUp7 = userRef
      .collection(collectionName.Received)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data()) as IProfileDetails[];
        dispatch(setReceived(data));
      });

    const cleanUp8 = userRef
      .collection(collectionName.Sent)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data()) as IProfileDetails[];
        dispatch(setSent(data));
      });

    return () => {
      cleanUp();
      cleanUp2();
      cleanUp3();
      cleanUp5();
      cleanUp6();
      cleanUp7();
      cleanUp8();
    };
  }, []);
}
