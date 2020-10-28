// Import FirebaseAuth and firebase.
import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase";

// Styles
import styles from "./auth.module.css";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

export default class SignInScreen extends React.Component {
  render() {
    return (
      <>
        <div className={styles.login_container}>
          <h1>Find something to watch together, finally.</h1>
          <p className={styles.intro}>Get advanced recommendations and notices when you and your friends both like a movie!</p>
          <div>
            <StyledFirebaseAuth
              className={styles.firebaseUi}
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </div>
      </>
    );
  }
}
