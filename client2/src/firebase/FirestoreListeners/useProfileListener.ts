import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  IProfileDetails,
  setProfile,
} from "../../redux/Profile/profileReducer";
import { store } from "../../store";
import { db } from "../config";
import { collectionName } from "../names";

export default function useProfileListener() {
  const dispatch = useDispatch();
  const uid = store.getState().auth.user?.uid as string;
  const userRef = db.collection(collectionName.User).doc(uid);
  useEffect(() => {
    const cleanUp = userRef.onSnapshot((snap) => {
      const data = snap.data() as IProfileDetails;
      dispatch(setProfile(data));
    });

    return () => cleanUp();
  }, []);
}
