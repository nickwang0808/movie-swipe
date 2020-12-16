import { store } from "../../store";
import { db } from "../config";
import { collectionName } from "../names";

// let cloud function handle the other side of update
export default async function acceptFriend(friendUid: string) {
  const uid = store.getState().auth.user?.uid as string;

  const userCol = db.collection(collectionName.User);

  const inviterDocRef = userCol
    .doc(uid)
    .collection(collectionName.Received)
    .doc(friendUid);
  const myFriendDocRef = userCol
    .doc(uid)
    .collection(collectionName.Friends)
    .doc(friendUid);

  await db.runTransaction(async (t) => {
    const doc = await t.get(inviterDocRef);

    t.set(myFriendDocRef, { ...doc.data() });

    t.delete(inviterDocRef);
  });
}
