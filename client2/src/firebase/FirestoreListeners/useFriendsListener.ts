import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setFriends,
  setReceived,
  setSent,
} from "../../redux/Friends/friendsReducer";
import { IProfileDetails } from "../../redux/Profile/profileReducer";
import { store } from "../../store";
import { db } from "../config";
import { collectionName } from "../names";

export default function useFriendsListener() {
  const uid = store.getState().auth.user?.uid as string;
  const userRef = db.collection(collectionName.User).doc(uid);
  const dispatch = useDispatch();
  useEffect(() => {
    const cleanUp = userRef
      .collection(collectionName.Friends)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data()) as IProfileDetails[];
        dispatch(setFriends(data));
      });

    return () => cleanUp();
  }, []);
  useEffect(() => {
    const cleanUp = userRef
      .collection(collectionName.Received)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data()) as IProfileDetails[];
        dispatch(setReceived(data));
      });

    return () => cleanUp();
  }, []);
  useEffect(() => {
    const cleanUp = userRef
      .collection(collectionName.Sent)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data()) as IProfileDetails[];
        dispatch(setSent(data));
      });

    return () => cleanUp();
  }, []);
}
