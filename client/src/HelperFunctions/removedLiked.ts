import { arrayRemove, db } from "../firebase/config";
import { LikedMovieWithMatches } from "../db-operations/useGetLikedMovies";

export default async function removeLiked(userId: string, movieId: number) {
  const docRef = db
    .collection("Users")
    .doc(userId)
    .collection("User_Details")
    .doc("Liked_Movies");
  const oldLikes: LikedMovieWithMatches[] = (await docRef.get()).data()
    ?.liked_movies_matches;
  const newLikes = oldLikes.filter((elem) => elem.movieId !== movieId);
  await docRef.update({
    liked_movies_matches: newLikes,
    liked_movies: arrayRemove(movieId),
  });
}
