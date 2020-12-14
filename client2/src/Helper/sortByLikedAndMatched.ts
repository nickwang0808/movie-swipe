import { IVotedMovies } from "../MovieTypes/IPopularMovies";

export default function sortByLikedAndMatched(
  a: IVotedMovies,
  b: IVotedMovies
) {
  if (!a.timeMatched && !b.timeMatched) {
    // compare like time
    return b.timeVoted - a.timeVoted;
  } else if (!a.timeMatched && b.timeMatched) {
    return 1;
  } else if (a.timeMatched && !b.timeMatched) {
    return -1;
  } else if (a.timeMatched && b.timeMatched) {
    return (b.timeMatched as number) - (a.timeMatched as number);
  } else {
    return 0;
  }
}
