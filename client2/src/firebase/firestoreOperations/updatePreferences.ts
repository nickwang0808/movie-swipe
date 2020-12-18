import { ResetPageNum } from "../../redux/MovieList/MovieListReducer";
import {
  IProfileDetails,
  movieListTypes,
} from "../../redux/Profile/profileReducer";
import { store } from "../../store";
import { db } from "../config";
import { collectionName } from "../names";

export default async function updatePreferences(
  newGenre: number[],
  newMovieListType: movieListTypes
) {
  const { genrePreference, movieListTypePref } = store.getState().profile
    .profile as IProfileDetails;

  if (!genrePreference || !movieListTypePref) return;

  // compare genre
  const genreChanged =
    JSON.stringify(newGenre.sort()) !==
    JSON.stringify(genrePreference.slice().sort());
  // compare movielist type
  const moviePrefChanged = movieListTypePref !== newMovieListType;

  if (genreChanged || moviePrefChanged) {
    const uid = store.getState().auth.user?.uid as string;
    const userRef = db.collection(collectionName.User).doc(uid);

    const batch = db.batch();
    if (genreChanged) {
      batch.update(userRef, {
        genrePreference: newGenre,
      });
    }
    if (moviePrefChanged) {
      batch.update(userRef, {
        movieListTypePref: newMovieListType,
      });
    }
    store.dispatch(ResetPageNum());
    await batch.commit();
    window.location.reload();
  }

  return;
}