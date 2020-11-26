import { WithMatchesAndTime } from "../db-operations/useGetLikedMovies";

export default function sortByLikeAndMatchTime(
  a: WithMatchesAndTime,
  b: WithMatchesAndTime
) {
  if (a.match_time == null && b.match_time === null) {
    // compare like time
    return b.like_time - a.like_time;
  } else {
    return (b.match_time as number) - (a.match_time as number);
  }
}
