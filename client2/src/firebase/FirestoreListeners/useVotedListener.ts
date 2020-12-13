import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Result } from "../../MovieTypes/IPopularMovies";
import {
  setDisLiked,
  setLiked,
  setWatched,
} from "../../redux/Voted/votedMovieReducer";
import { IAppState } from "../../store";
import { db } from "../config";

export default function useVotedMovieListener(
  type: "Liked" | "Watched" | "Disliked"
) {
  const uid = useSelector((state: IAppState) => state.auth.user?.uid as string);
  const dispatch = useDispatch();

  useEffect(() => {
    const cleanUp = db
      .collection("users")
      .doc(uid)
      .collection(type)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data()) as Result[];
        switch (type) {
          case "Liked":
            dispatch(setLiked(data));
            break;
          case "Disliked":
            dispatch(setDisLiked(data));
            break;
          case "Watched":
            dispatch(setWatched(data));
            break;
          default:
            break;
        }
      });

    return () => cleanUp();
  }, []);
}
