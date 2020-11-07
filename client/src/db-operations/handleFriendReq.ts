import { db } from "../firebase/config";
import { arrayRemove } from "../firebase/config";

export function decline(userId: string) {
  db.collection("Users")
    .doc(userId)
    .collection("User_Details")
    .doc("Friends")
    .update({
      pending_received: arrayRemove(userId),
    });
}
