import { IVotedMovies, IVotedMTvs } from "../../MovieTypes";
import { store } from "../../store";
import { db } from "../config";
import { collectionName } from "../names";

export default async function updateVote(
  movieId: number | string,
  isLike: boolean // change to
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

  // retrieve the data
  const { DisLiked, Liked } = store.getState().voted;

  let movieInfo: IVotedMovies | IVotedMTvs;
  if (isLike) {
    const found = DisLiked?.find((elem) => elem.id === Number(movieId));
    if (!found) return;
    movieInfo = found;
  } else {
    const found = Liked?.find((elem) => elem.id === Number(movieId));
    if (!found) return;
    movieInfo = found;
  }

  await db
    .collection(collectionName.User)
    .doc(uid)
    .collection(destinationCollection)
    .doc(String(movieId))
    .set({
      ...movieInfo,
      matchedWith: [],
    });

  docRef.delete();
  return;
}
