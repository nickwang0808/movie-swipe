import { IonApp, IonContent, isPlatform } from "@ionic/react";
import firebase from "firebase/app";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import bg from "../../Assets/img/poster_1.jpg";
import BigLogo from "../../Assets/svg/BigLogo";
import OnBoardDeck from "../../comp/Onboard/OnBoardDeck";
import { auth } from "../../firebase/config";
import newUserDBInit, { newAnonUserDBInit } from "../../Helper/newUserDBInit";
import { signInError } from "../../redux/Auth/AuthReducer";
import { Btn } from "../../theme/BaseComp";

const isWeb = isPlatform("mobileweb") || isPlatform("desktop");

interface IProps {
  setShowLogin: () => void;
}

export default function OnBoardScreenOne({ setShowLogin }: IProps) {
  const dispatch = useDispatch();
  const handleAnonSignIn = async () => {
    const user = await auth.signInAnonymously();
    await newAnonUserDBInit(user.user?.uid as string);
  };

  const signInWithGoogle = () => {
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

  return (
    <IonApp>
      <StyledIonContent>
        <Wrapper>
          <BigLogo />
          <OnBoardDeck />
          <StyledButtonWrapper>
            <p className="ion-text-center ion-margin-bottom">
              MovieSync helps you and your friends find new movies to watch
              together...finally.
            </p>
            <Btn onClick={isWeb ? handleAnonSignIn : signInWithGoogle}>
              {isWeb ? "Continue" : "Continue With Google"}
            </Btn>
            <StyledLink onClick={setShowLogin}>Register / Log In</StyledLink>
          </StyledButtonWrapper>
        </Wrapper>
      </StyledIonContent>
    </IonApp>
  );
}

const StyledButtonWrapper = styled.div.attrs({
  className: "ion-margin-top",
})`
  & > div {
    width: fit-content;
    margin: 0 auto;
    min-width: 50%;
  }
`;

const StyledLink = styled.div`
  text-decoration: underline;
  color: var(--dark);
  display: flex;
  justify-content: center;
  font-size: 1.8rem;
  line-height: 7rem;
`;

const StyledIonContent = styled(IonContent)`
  &::part(background) {
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0.6)
      ),
      url(${bg});
    filter: blur(8px);
    -webkit-filter: blur(8px);
    background-position: center;
    transform: scale(2);
    z-index: -1;
  }
`;

const Wrapper = styled.div.attrs({
  className: "ion-padding-horizontal",
})`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: calc(var(--global-window-inner-height) - 2rem);
`;
