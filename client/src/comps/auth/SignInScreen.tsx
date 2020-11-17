import React, { useContext, useState } from "react";
import { User } from "firebase/app";
import { auth } from "../../firebase/config";
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

  const handleSignUnEmail = (email: string, password: string) => {
    auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("handleSignUnEmail -> errorCode", errorCode);
      setError(errorMessage);
      // ...
    });
  };

  const completeWithEmail = (email: string, password: string) => {
    var credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );

    auth.currentUser
      ?.linkWithCredential(credential)
      .then(async (usercred) => {
        var user = usercred.user;
        if (user) {
          await updateUserInfo(user.uid);
        }
        console.log("Anonymous account successfully upgraded", user);
        history.goBack();
      })
      .catch(function (error) {
        console.log("Error upgrading anonymous account", error);
      });
  };

  const completeWithSocialSignUp = () => {
    auth.currentUser
      ?.linkWithPopup(provider)
      .then(async (usercred) => {
        const user = usercred.user;
        if (user) {
          await user.updateProfile({
            displayName: user.providerData[0]?.displayName,
            photoURL: user.providerData[0]?.photoURL,
          });

          await updateUserInfo(user.uid);
          history.goBack();
        }
        console.log("Anonymous account successfully upgraded", user);
      })
      .catch(function (error) {
        console.log("Error upgrading anonymous account", error);
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
                : handleSignUnEmail(email, password)
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
          {isSignUp
            ? "Already registered? Login instead"
            : "Need an account? Sign Up"}
        </button>
        <button>Skip</button>
      </form>
    </>
  );

  return (
    <div className={style.login_container}>
      <h2>
        Create a MovieSync account so you and your friends can finally find
        something to watch, together!
      </h2>
      <button
        className={`${sharedstyle.btn} ${style.btn_login_google}`}
        onClick={existingEmail ? completeWithSocialSignUp : handleSignInGoogle}
      >
        Sign Up or Login With Google
      </button>
      <p>-or-</p>
      <div className={style.email}>
        {error && <div className={style.error}>{error}</div>}{" "}
        {/* log any login err below everything */}
        {emailAuthSignIn}
      </div>
    </div>
  );
}
