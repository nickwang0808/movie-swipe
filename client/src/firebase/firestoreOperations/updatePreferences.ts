import {
  clearMovieList,
  ResetPageNum,
} from "../../redux/MovieList/MovieListReducer";
import {
  IMediaPref,
  IProfileDetails,
} from "../../redux/Profile/profileReducer";
import { store } from "../../store";
import { db } from "../config";
import { collectionName } from "../names";

export default async function updatePreferences(
  newGenre: number[],
  newMediaListType: IMediaPref
) {
  const {
    genrePreference,
    mediaListTypePref: movieListTypePref,
  } = store.getState().profile.profile as IProfileDetails;

  if (!genrePreference || !movieListTypePref) return;

  // compare genre
  const genreChanged =
    JSON.stringify(newGenre.sort()) !==
    JSON.stringify(genrePreference.slice().sort());
  // compare movielist type
  const moviePrefChanged = compareMediaType(
    movieListTypePref,
    newMediaListType
  );

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
        mediaListTypePref: newMediaListType,
      });
    }
    await batch.commit();
    store.dispatch(ResetPageNum());
    store.dispatch(clearMovieList());
    // window.location.reload();
  }

  return;
}

function compareMediaType(oldPref: IMediaPref, newPref: IMediaPref) {
  if (
    oldPref.catagories === newPref.catagories &&
    oldPref.media === newPref.media
  ) {
    return false;
  }
  return true;
}
