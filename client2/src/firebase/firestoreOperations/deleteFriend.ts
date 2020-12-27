import { store } from "../../store";
import { db } from "../config";
import { collectionName } from "../names";

export default async function deleteFriend(friendUid: string) {
  const uid = store.getState().auth.user?.uid as string;
  await db
    .collection(collectionName.User)
    .doc(uid)
    .collection(collectionName.Friends)
    .doc(friendUid)
    .delete();
}
