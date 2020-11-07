import * as admin from "firebase-admin";
const serviceAccount = require("./secret.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://movie-swipe-82f52.firebaseio.com",
});

export const db = admin.firestore();
export const arrayUnion = admin.firestore.FieldValue.arrayUnion;
export const arrayRemove = admin.firestore.FieldValue.arrayRemove;

import userLookUpRoute from "./UserLookUp";
import snedFriendReqRoute from "./SendFrendReq";
// import { acceptRequest, declineRequest } from "./handleFriendsReq";
import * as handleFriendsReq from "./handleFriendsReq";

export const sendFriendReq = snedFriendReqRoute;
export const userLookUp = userLookUpRoute;
export const acceptRequest = handleFriendsReq.acceptRequest;
export const declineRequest = handleFriendsReq.declineRequest;
export const deleteFriend = handleFriendsReq.deleteFriend;
