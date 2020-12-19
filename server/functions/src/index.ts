import * as admin from "firebase-admin";
import { IMovieDetails, IReleaseDates } from "./IGetMovieDetails";
const serviceAccount = require("./secret.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://movie-swipe-82f52.firebaseio.com",
});
// export { changeLikeToDislike } from "./changeLikeToDislike";
export { checkMatchesWhileSwiping } from "./checkMatchesWhileSwiping";
// export { deleteAccount } from "./deleteAccount";
// export { deleteAllAccount } from "./DeleteAllAccount";
export { findAllMatches } from "./findAllMatches";
export { acceptRequest, deleteFriend } from "./handleFriendsReq";
export { handleWatched } from "./handleWatched";
export { sendFriendReq } from "./SendFrendReq";

export const db = admin.firestore();
export const adminAuth = admin.auth;
export const arrayUnion = admin.firestore.FieldValue.arrayUnion;
export const arrayRemove = admin.firestore.FieldValue.arrayRemove;

export interface LikedMovieWithMatches {
  movieId: number;
  matches: string[];
  liked_time: number;
  match_time: number | null;
} // pending delete

export interface IProfileDetails {
  displayName: string | null;
  email: string | null;
  isAnonymous: boolean;
  photoURL: null | string;
  uid: string;
  genrePreference: number[];
}

export interface IAdditionalMovieInfo extends IMovieDetails {
  genre_ids: number[];
  release_dates: IReleaseDates;
}

export interface IVotedMovies extends IAdditionalMovieInfo, IProfileDetails {
  uid: string;
  isLike: boolean;
  matchedWith: IProfileDetails[];
  timeMatched: number | null;
  timeVoted: number;
  notify: boolean;
}

export interface IWatchedMovies extends IVotedMovies {
  watchedWith: IProfileDetails[];
  timeWatched: number;
}

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
