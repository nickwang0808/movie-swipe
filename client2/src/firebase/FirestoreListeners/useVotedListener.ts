import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Result } from "../../MovieTypes/IPopularMovies";
import {
  setDisLiked,
  setLiked,
  setWatched,
} from "../../redux/Voted/votedMovieReducer";
import { store } from "../../store";
import { db } from "../config";

enum type {
  Liked = "Liked",
  Watched = "Watched",
  Disliked = "Disliked",
}

export default function useVotedMovieListener() {
  const dispatch = useDispatch();
  const uid = store.getState().auth.user?.uid as string;
  const userRef = db.collection("users").doc(uid);
  useEffect(() => {
    const cleanUp = userRef.collection(type.Liked).onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data()) as Result[];
      dispatch(setLiked(data));
    });

    return () => cleanUp();
  }, []);

  useEffect(() => {
    const cleanUp = userRef.collection(type.Disliked).onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data()) as Result[];
      dispatch(setDisLiked(data));
    });

    return () => cleanUp();
  }, []);

  useEffect(() => {
    const cleanUp = userRef.collection(type.Watched).onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data()) as Result[];
      dispatch(setWatched(data));
    });

    return () => cleanUp();
  }, []);
}
