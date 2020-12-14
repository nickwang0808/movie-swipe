import * as admin from "firebase-admin";
const serviceAccount = require("./secret.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://movie-swipe-82f52.firebaseio.com",
});
export { changeLikeToDislike } from "./changeLikeToDislike";
export { checkMatchesWhileSwiping } from "./checkMatchesWhileSwiping";
export { deleteAccount } from "./deleteAccount";
export { deleteAllAccount } from "./DeleteAllAccount";
export { findAllMatches } from "./findAllMatches";
export { acceptRequest, deleteFriend } from "./handleFriendsReq";
export { handleWatched } from "./handleWatched";
export { sendFriendReq } from "./SendFrendReq";
export { userLookUp } from "./UserLookUp";

export const db = admin.firestore();
export const adminAuth = admin.auth;
export const arrayUnion = admin.firestore.FieldValue.arrayUnion;
export const arrayRemove = admin.firestore.FieldValue.arrayRemove;

export interface LikedMovieWithMatches {
  movieId: number;
  matches: string[];
  liked_time: number;
  match_time: number | null;
}

export interface IProfileDetails {
  displayName: string | null;
  email: string | null;
  isAnonymous: boolean;
  photoURL: null | string;
  uid: string;
  genrePreference: number[];
}

export interface Result {
  popularity: number;
  vote_count: number;
  video: boolean;
  poster_path: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_title: string;
  genre_ids: number[];
  title: string;
  vote_average: number;
  overview: string;
  release_date: Date;
}

export interface IVotedMovies extends Result, IProfileDetails {
  uid: string;
  isLike: boolean;
  matchedWith: IProfileDetails;
  timeMatched: string | null;
  timeVoted: string;
}

export interface INotification extends Result {
  matchedWith: IProfileDetails[] | null;
  isLike: boolean;
  timeVoted: string;
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
