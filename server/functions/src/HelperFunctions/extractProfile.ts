import { IVotedMovies, IVotedMTvs } from "../../../../client2/src/MovieTypes";

export default function extractProfile(data: IVotedMovies | IVotedMTvs) {
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
