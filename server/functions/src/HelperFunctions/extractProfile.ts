import { IVotedMovies } from "..";

export default function extractProfile(data: IVotedMovies) {
  const {
    displayName,
    email,
    isAnonymous,
    photoURL,
    uid,
    genrePreference,
  } = data;

  return { displayName, email, isAnonymous, photoURL, uid, genrePreference };
}
