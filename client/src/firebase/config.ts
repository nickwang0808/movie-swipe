import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

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
if (process.env.NODE_ENV === "production") {
  firebase
    .firestore()
    .enablePersistence()
    .catch((err) => console.log(err));
}

firebase.analytics();
export const db = firebase.firestore();
export const auth = firebase.auth();
export const cloudFn = firebase.functions();

export const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
export const arrayRemove = firebase.firestore.FieldValue.arrayRemove;

// firebase.firestore().useEmulator("35.220.182.160", 8080);
// firebase.auth().useEmulator("http://35.220.182.160:9099/");
// firebase.functions().useEmulator("35.220.182.160", 5001);

// firebase.firestore().useEmulator("127.0.0.1", 8080);
// firebase.auth().useEmulator("http://127.0.0.1:9099/");
// firebase.functions().useEmulator("localhost", 5001);
