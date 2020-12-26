import * as admin from "firebase-admin";
const serviceAccount = require("./secret.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://movie-swipe-82f52.firebaseio.com",
});
// export { changeLikeToDislike } from "./changeLikeToDislike";
export { checkMatchesWhileSwiping } from "./checkMatchesWhileSwiping";
export { deleteFriend } from "./deleteFriend";
// export { deleteAccount } from "./deleteAccount";
// export { deleteAllAccount } from "./DeleteAllAccount";
export { findAllMatches } from "./findAllMatches";
export { acceptRequest } from "./handleFriendsReq";
export { handleWatched } from "./handleWatched";
export { sendFriendReq } from "./SendFrendReq";

export const db = admin.firestore();
export const adminAuth = admin.auth;
export const arrayUnion = admin.firestore.FieldValue.arrayUnion;
export const arrayRemove = admin.firestore.FieldValue.arrayRemove;

export const enum collectionName {
  User = "Users",

  Liked = "Liked",
  Disliked = "Disliked",
  Watched = "Watched",

  Friends = "Friends",
  Received = "Received",
  Sent = "Sent",

  Notifications = "Notification",
}
