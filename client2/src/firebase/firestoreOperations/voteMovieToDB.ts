import { IPopulatedResult } from "../../MovieTypes";
import { store } from "../../store";
import { db } from "../config";
import { collectionName } from "../names";

export default function voteMovieToDB(
  isLike: boolean,
  movie: IPopulatedResult
) {
  const uid = store.getState().auth.user?.uid as string;
  const profile = store.getState().profile.profile;

  db.collection(collectionName.User)
    .doc(uid)
    .collection(isLike ? collectionName.Liked : collectionName.Disliked)
    .doc(String(movie.id))
    .set({
      ...profile,
      uid,
      isLike,
      ...movie,
      timeVoted: Date.now(),
      matchedWith: [],
      timeMatched: null,
      notify: false,
    });
}
