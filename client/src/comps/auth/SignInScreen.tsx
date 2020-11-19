import React, { useContext, useState } from "react";
import { User } from "firebase/app";
import { auth, cloudFn, db } from "../../firebase/config";
import BackButton from "../ButtonComps/BackButton";

import { cfaSignIn } from "capacitor-firebase-auth";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import style from "./auth.module.css";
import { UserContext } from "../../store";

import firebase from "firebase/app";
import "firebase/auth";
import updateUserInfo from "../../db-operations/updateUserInfo";
import { useHistory } from "react-router";

var provider = new firebase.auth.GoogleAuthProvider();

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>();

  const [isSignUp, setIsSignUp] = useState(true);

  const { userAuth } = useContext(UserContext);
  const existingEmail = userAuth?.userInfo.email;

  const history = useHistory();

  const handleSignInGoogle = () => {
    cfaSignIn("google.com").subscribe((user: User) =>
      console.log(user.displayName)
    );
  };

  const handleSignInEmail = (email: string, password: string) => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("handleSignInEmail -> errorCode", errorCode);
      setError(errorMessage);
    });
  };

  const handleSignUpEmail = (email: string, password: string) => {
    auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("handleSignUnEmail -> errorCode", errorCode);
      setError(errorMessage);
      // ...
    });
  };

  const getTempLikedMovies = async () => {
    const oldUid = auth.currentUser?.uid;
    const userRef = db.collection("Users").doc(oldUid);
    const likedRef = await userRef
      .collection("User_Details")
      .doc("Liked_Movies")
      .get();
    const dislikedRef = await userRef
      .collection("User_Details")
      .doc("Disliked_Movies")
      .get();
    const liked_movies: number[] = likedRef.data()?.liked_movies;
    const disliked_movies: number[] = dislikedRef.data()?.disliked_movies;

    localStorage.setItem("liked_movies", liked_movies.join(","));
    localStorage.setItem("disliked_movies", disliked_movies.join(","));
    localStorage.setItem("oldUid", oldUid as string);
    return;
  };

  const completeWithEmail = async (email: string, password: string) => {
    const userRef = db.collection("Users").doc(auth.currentUser?.uid);
    await getTempLikedMovies();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        try {
          cloudFn.httpsCallable("deleteAccount")({
            accountToDelete: localStorage.getItem("oldUid"),
          });
          history.goBack();
        } catch (err) {
          console.log("SignInScreen -> err", err);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("handleSignUnEmail -> errorCode", errorCode);
        setError(errorMessage);
      });
  };

  const completeWithSocialSignUp = async () => {
    const userRef = db.collection("Users").doc(auth.currentUser?.uid);
    await getTempLikedMovies();

    cfaSignIn("google.com").subscribe((user: User) => {
      console.log("SignInScreen -> user", user);

      cloudFn.httpsCallable("deleteAccount")({
        accountToDelete: localStorage.getItem("oldUid"),
      });
      history.goBack();
    });
  };

  const emailAuthSignIn = (
    <>
      <form>
        <label>Email</label>
        <input onChange={(e) => setEmail(e.target.value)} value={email} />
        <label>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} value={password} />
        <button
          onClick={(e) => {
            e.preventDefault();
            return isSignUp
              ? existingEmail === null
                ? completeWithEmail(email, password)
                : handleSignUpEmail(email, password)
              : handleSignInEmail(email, password);
          }}
        >
          {isSignUp ? "Sign Up with Email" : "Login with Email"}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            return setIsSignUp((prev) => !prev);
          }}
        >
          {isSignUp ? "Log In" : "Sign Up"}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        >
          back
        </button>
      </form>
    </>
  );

  return (
    <div className="container_allcontent">
      <h1>
        <BackButton linkTo="history.goBack()" />
        Register / Log In
      </h1>
      <div className={style.login_container}>
        <h2>
          Create a free MovieSync account so you and your friends can finally
          find something to watch, together!
        </h2>
        <button
          className={`${sharedstyle.btn} ${style.btn_login_google}`}
          onClick={
            existingEmail === null
              ? completeWithSocialSignUp
              : handleSignInGoogle
          }
        >
          Sign Up or Login With Google
        </button>
        <p>-or-</p>
        <div className={style.email}>
          {error && <div className={style.error}>{error}</div>}{" "}
          {emailAuthSignIn}
        </div>
      </div>
    </div>
  );
}
