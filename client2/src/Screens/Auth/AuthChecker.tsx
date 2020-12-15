import firebase from "firebase/app";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CenterLoader } from "../../comp/Misc/LoadingSpinner";
import { auth } from "../../firebase/config";
import newUserDBInit from "../../Helper/newUserDBInit";
import {
  signInError,
  userNotSigned,
  userSignedIn,
} from "../../redux/Auth/AuthReducer";
import { IAppState } from "../../store";

export default function AuthChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, isAnonymous, photoURL, uid } = user;
        dispatch(
          userSignedIn({ displayName, email, isAnonymous, photoURL, uid })
        );
      } else {
        dispatch(userNotSigned());
      }
    });
  }, []);

  function loginWithGoogle() {
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
  }

  const authState = useSelector((state: IAppState) => state.auth);
  if (!authState.isLoaded) return <CenterLoader />;
  if (!authState.authenticated)
    return <StyledButton onClick={loginWithGoogle}>Sign In</StyledButton>;
  return <>{children}</>;
}

const StyledButton = styled.button`
  font-size: 30px;
`;
