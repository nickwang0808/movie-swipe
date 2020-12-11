import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import "firebase/functions"; // <- needed if using httpsCallable
import { firebaseReducer } from "react-redux-firebase";
import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore"; // <- needed if using firestore

const fbConfig = {
  apiKey: "AIzaSyAD46xBT6mGc5jTUf7SbcXEWIYpQQTxaVo",
  authDomain: "movie-swipe-82f52.firebaseapp.com",
  databaseURL: "https://movie-swipe-82f52.firebaseio.com",
  projectId: "movie-swipe-82f52",
  storageBucket: "movie-swipe-82f52.appspot.com",
  messagingSenderId: "207672176585",
  appId: "1:207672176585:web:3cc90cd499fcf02867c218",
  measurementId: "G-596QFSTW17",
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

firebase.initializeApp(fbConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const cloudFn = firebase.functions();
db.useEmulator("35.220.182.160", 8080);
firebase.auth().useEmulator("http://35.220.182.160:9099/");
firebase.functions().useEmulator("http://35.220.182.160", 5001);

export const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
export const arrayRemove = firebase.firestore.FieldValue.arrayRemove;

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};
export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools()
);

export type IRootState = ReturnType<typeof rootReducer>;

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};
