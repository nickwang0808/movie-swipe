import { store } from "../../store";
import { db } from "../config";
import { collectionName } from "../names";

export default async function removeNotification(movieId: number | string) {
  const uid = store.getState().auth.user?.uid as string;

  await db
    .collection(collectionName.User)
    .doc(uid)
    .collection(collectionName.Liked)
    .doc(String(movieId))
    .update({
      notify: false,
    });

  return;
}
