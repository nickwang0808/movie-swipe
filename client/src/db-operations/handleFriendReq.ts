import { arrayUnion, cloudFn, db, arrayRemove } from "../firebase/config";

export async function decline(userId: string, senderId: string) {
  await db
    .collection("Users")
    .doc(userId)
    .collection("User_Details")
    .doc("Friends")
    .update({
      pending_received: arrayRemove(senderId),
    });
}

export async function accept(userId: string, senderId: string) {
  await db
    .collection("Users")
    .doc(userId)
    .collection("User_Details")
    .doc("Friends")
    .update({
      pending_received: arrayRemove(senderId),
      friends: arrayUnion(senderId),
    });
}

export async function deleteFriend(userId: string, friendId: string) {
  await db
    .collection("Users")
    .doc(userId)
    .collection("User_Details")
    .doc("Friends")
    .update({
      friends: arrayRemove(friendId),
    });
  await cloudFn.httpsCallable("deleteFriend")({ id: friendId });
}
