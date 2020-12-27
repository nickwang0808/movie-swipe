import { db } from "../firebase/config";

export default async function updateGenrePreference(
  userId: string,
  genrePreference: number[]
) {
  await db.collection("Users").doc(userId).update({
    genre_preference: genrePreference,
  });
}
