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

  await db.runTransaction((transaction) => {
    return transaction.get(inviterDocRef).then((doc) => {
      if (!doc.exists) {
        throw "no invites found";
      }

      myFriendDocRef.set({ ...doc.data() });
      inviterDocRef.delete();
    });
  });
}
