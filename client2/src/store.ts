import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import "firebase/functions"; // <- needed if using httpsCallable
import { firebaseReducer, getFirebase } from "react-redux-firebase";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  createFirestoreInstance,
  firestoreReducer,
  getFirestore,
} from "redux-firestore"; // <- needed if using firestore
import ReduxThunk from "redux-thunk";
import { genrePreference } from "./Helper/variables";
import movieListSliceReducer from "./redux/MovieList/MovieListReducer";
import WindowSizingReducer from "./redux/WindowSize/WindowSizingReducer";

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
  profileFactory: (userData: any, profileData: any, firebase: any) => {
    return {
      ...profileData,
      genrePreference,
    };
  },
};

firebase.initializeApp(fbConfig);

// firebase.firestore().useEmulator("127.0.0.1", 8080);
// firebase.auth().useEmulator("http://127.0.0.1:9099/");
// firebase.functions().useEmulator("http://localhost", 5001);
firebase.firestore().useEmulator("35.220.182.160", 8080);
firebase.auth().useEmulator("http://35.220.182.160:9099/");
firebase.functions().useEmulator("http://35.220.182.160", 5001);

export const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
export const arrayRemove = firebase.firestore.FieldValue.arrayRemove;

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  movieList: movieListSliceReducer,
  windowSizing: WindowSizingReducer,
});

// Create store with reducers and initial state
const initialState = {};
export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(ReduxThunk.withExtraArgument({ getFirebase, getFirestore }))
  )
);

export type IAppState = ReturnType<typeof rootReducer>;
export type IAppDispatch = typeof store.dispatch;

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};
