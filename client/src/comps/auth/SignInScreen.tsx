import React, { useState } from "react";
import { User } from "firebase/app";
import { auth } from "../../firebase/config";
import { cfaSignIn } from "capacitor-firebase-auth";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import style from "./auth.module.css";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>();

  const [isSignUp, setIsSignUp] = useState(false);

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
              ? handleSignUnEmail(email, password)
              : handleSignInEmail(email, password);
          }}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            return setIsSignUp((prev) => !prev);
          }}
        >
          {isSignUp
            ? "Already a MovieSync friend? Sign-in instead"
            : "Need an account? Sign up"}
        </button>
      </form>
    </>
  );

  return (
    <div className={style.login_container}>
      <h2>
        Create a MovieSync account to enable friend matching, so you can finally
        find watch something, together!
      </h2>
      <button
        className={`${sharedstyle.btn} ${style.btn_login_google}`}
        onClick={handleSignInGoogle}
      >
        Sign in with Google
      </button>
      <p>-or-</p>
      <div className={style.email}>
        {emailAuthSignIn}
        {error && <div>{error}</div>} {/* log any login err below everything */}
      </div>
    </div>
  );
}
