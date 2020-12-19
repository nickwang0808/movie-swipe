import { store } from "../../store";
import { db } from "../config";
import { collectionName } from "../names";

export default async function deleteNotification(docId: string) {
  const uid = store.getState().auth.user?.uid as string;

  await db
    .collection(collectionName.User)
    .doc(uid)
    .collection(collectionName.Notifications)
    .doc(docId)
    .delete();
}
