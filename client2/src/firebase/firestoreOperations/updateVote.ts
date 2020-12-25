import { IVotedMovies, IVotedMTvs } from "../../MovieTypes";
import { store } from "../../store";
import { db } from "../config";
import { collectionName } from "../names";

export default async function updateVote(
  movieId: number | string,
  isLike: boolean
) {
  const uid = store.getState().auth.user?.uid as string;
  const destinationCollection = isLike
    ? collectionName.Liked
    : collectionName.Disliked;
  const docRef = db
    .collection(collectionName.User)
    .doc(uid)
    .collection(isLike ? collectionName.Disliked : collectionName.Liked)
    .doc(String(movieId));

  await db.runTransaction(async (t) => {
    const movieInfo = (await t.get(docRef)).data() as IVotedMovies | IVotedMTvs;
    t.delete(docRef);

    t.set(
      db
        .collection(collectionName.User)
        .doc(uid)
        .collection(destinationCollection)
        .doc(String(movieId)),
      {
        ...movieInfo,
        matchedWith: [],
      }
    );
  });

  return;
}
