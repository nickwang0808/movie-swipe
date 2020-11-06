import * as admin from "firebase-admin";
const serviceAccount = require("./secret.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://movie-swipe-82f52.firebaseio.com",
});

import userLookUpRoute from "./UserLookUp";
import snedFriendReqRoute from "./SendFrendReq";

export const sendFriendReq = snedFriendReqRoute;

export const userLookUp = userLookUpRoute;
