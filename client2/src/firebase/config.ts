import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAD46xBT6mGc5jTUf7SbcXEWIYpQQTxaVo",
  authDomain: "movie-swipe-82f52.firebaseapp.com",
  databaseURL: "https://movie-swipe-82f52.firebaseio.com",
  projectId: "movie-swipe-82f52",
  storageBucket: "movie-swipe-82f52.appspot.com",
  messagingSenderId: "207672176585",
  appId: "1:207672176585:web:3cc90cd499fcf02867c218",
  measurementId: "G-596QFSTW17",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();