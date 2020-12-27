import { cfaSignIn } from "capacitor-firebase-auth";
import { User } from "firebase/app";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { auth, cloudFn, db } from "../../firebase/config";
import { UserContext } from "../../store";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import style from "./auth.module.css";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>();

  const [isSignUp, setIsSignUp] = useState(true);

  const { userAuth } = useContext(UserContext);
  const existingEmail = userAuth?.userInfo.email;

  const history = useHistory();

  const handleSignInGoogle = () => {
    cfaSignIn("google.com").subscribe();
  };

  const handleSignInEmail = (email: string, password: string) => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      const errorMessage = error.message;
      setError(errorMessage);
    });
  };

  const handleSignUpEmail = (email: string, password: string) => {
    auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      const errorMessage = error.message;
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
    await getTempLikedMovies();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        try {
          cloudFn.httpsCallable("deleteAccount")({
            accountToDelete: localStorage.getItem("oldUid"),
          });
          history.goBack();
        } catch (err) {}
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const completeWithSocialSignUp = async () => {
    await getTempLikedMovies();

    cfaSignIn("google.com").subscribe((user: User) => {
      cloudFn.httpsCallable("deleteAccount")({
        accountToDelete: localStorage.getItem("oldUid"),
      });
      history.goBack();
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  };

  const emailAuthSignIn = (
    <>
      <form>
        <label>Email</label>
        <input
          autoComplete="true"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password</label>
        <input
          autoComplete="true"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
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
        {/* <button
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        >
          back
        </button> */}
      </form>
    </>
  );

  return (
    <div className="container_allcontent">
      <h1>
        <div
          className={sharedstyle.btn_Back}
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        >
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.7071 1.70712L9.29292 0.292908L0.585815 9.00001L9.29292 17.7071L10.7071 16.2929L4.41423 10H19.5V8H4.41426L10.7071 1.70712Z" />
          </svg>
        </div>
        Register / Log In
      </h1>
      <div className={style.login_container}>
        <p>
          Create a free MovieSync account so you and your friends can finally
          find something to watch, together!
        </p>
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
