import { IVotedMovies } from "../../MovieTypes";
import { IProfileDetails } from "../../redux/Profile/profileReducer";
import { store } from "../../store";
import { db } from "../config";
import { collectionName } from "../names";

export default async function watchedMovie(
  watchedWithIds: string[],
  movieId: number | string
) {
  const uid = store.getState().auth.user?.uid as string;
  const userRef = db.collection(collectionName.User).doc(uid);

  await db.runTransaction(async (t) => {
    // get liked movie
    const likedRef = userRef
      .collection(collectionName.Liked)
      .doc(String(movieId));
    // const likedMovie = (await t.get(likedRef)).data() as IVotedMovies;

    const likedMovie =
      store.getState().voted.Liked?.find((elem) => elem.id === movieId) ||
      ((await t.get(likedRef)).data() as IVotedMovies);

    // filter all matches in liked movie based on watchedWith
    const watchedWith = parseMatchToWatched(
      watchedWithIds,
      likedMovie.matchedWith
    );

    // push new data to watched collection
    t.set(userRef.collection(collectionName.Watched).doc(String(movieId)), {
      ...likedMovie,
      watchedWith,
      timeWatched: Date.now(),
    });
    // delete movie from liked
    t.delete(likedRef);
  });
}

function parseMatchToWatched(
  watchedWithIds: string[],
  matchedWith: IProfileDetails[]
) {
  const watchedWith = matchedWith.filter((elem) =>
    watchedWithIds.includes(elem.uid)
  );
  return watchedWith;
}
