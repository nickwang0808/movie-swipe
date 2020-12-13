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

enum type {
  Friends = "Friends",
  sent = "sent",
  received = "received",
}

export default function useFriendsListener() {
  const uid = store.getState().auth.user?.uid as string;
  const userRef = db.collection("users").doc(uid);
  const dispatch = useDispatch();
  useEffect(() => {
    const cleanUp = userRef.collection(type.Friends).onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data()) as IProfileDetails[];
      dispatch(setFriends(data));
    });

    return () => cleanUp();
  }, []);
  useEffect(() => {
    const cleanUp = userRef.collection(type.received).onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data()) as IProfileDetails[];
      dispatch(setReceived(data));
    });

    return () => cleanUp();
  }, []);
  useEffect(() => {
    const cleanUp = userRef.collection(type.sent).onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data()) as IProfileDetails[];
      dispatch(setSent(data));
    });

    return () => cleanUp();
  }, []);
}
