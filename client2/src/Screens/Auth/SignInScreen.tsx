import { IonContent, IonPage } from "@ionic/react";
import firebase from "firebase/app";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";
import MainHeader from "../../comp/Layout/MainHeader";
import { auth } from "../../firebase/config";
import newUserDBInit from "../../Helper/newUserDBInit";
import { signInError } from "../../redux/Auth/AuthReducer";
import { Btn } from "../../theme/BaseComp";
import SignInForm from "./SignInForm";

export default function SignInScreen() {
  const dispatch = useDispatch();

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user) {
          const {
            displayName,
            email,
            isAnonymous,
            photoURL,
            uid,
          } = result.user;
          newUserDBInit({ displayName, email, isAnonymous, photoURL, uid });
        }
      })
      .catch((err) => dispatch(signInError(err)));
  };

  const handleSignInEmail = (email: string, password: string) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        newUserDBInit({
          displayName: email,
          email,
          isAnonymous: false,
          photoURL: "",
          uid: result.user?.uid as string,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
        // setError(errorMessage);
      });
  };

  return (
    <>
      <IonPage>
        <MainHeader title="Register / Log In" />
        <IonContent className="ion-padding">
          <p className="ion-text-center">
            Create a free MovieSync account so you and your friends can finally
            find something to watch, together!
          </p>
          <StyledLoginButton onClick={loginWithGoogle}>
            Continue With Google
          </StyledLoginButton>
          <p className="ion-text-center">-or-</p>
          <SignInForm handleSignInEmail={handleSignInEmail} />
        </IonContent>
      </IonPage>
    </>
  );
}

const StyledLoginButton = styled(Btn)`
  background-color: #ce4b35;
  border: 0px;
  color: #fff;
  height: 6rem;
  width: inherit;
  margin: 3rem 0;

  &:active {
    background-color: #a73f2d;
    color: var(--light);
  }
`;
