import React, { useState } from "react";
import { User } from "firebase/app";
import { auth } from "../../firebase/config";
import { cfaSignIn } from "capacitor-firebase-auth";

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
          onClick={() => {
            return isSignUp
              ? handleSignUnEmail(email, password)
              : handleSignInEmail(email, password);
          }}
        >
          {isSignUp ? "SignUp" : "SignIn"}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            return setIsSignUp((prev) => !prev);
          }}
        >
          {isSignUp
            ? "Already have an account? SignIn instead"
            : "Don't have an account? SignUp"}
        </button>
      </form>
    </>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button style={{ fontSize: 32 }} onClick={handleSignInGoogle}>
        SignInWithGoogle
      </button>
      {emailAuthSignIn}
      {error && <div>{error}</div>} {/* log any login err below everything */}
    </div>
  );
}
