import { IonApp, IonContent, IonSlide, IonSlides } from "@ionic/react";
import React from "react";
import styled from "styled-components";
import bg from "../../Assets/img/poster_1.jpg";
import BigLogo from "../../Assets/svg/BigLogo";
import OnBoardDeck from "../../comp/Onboard/OnBoardDeck";

const slideOpts = {
  initialSlide: 1,
  speed: 400,
};

export default function OnBoardScreenOne() {
  return (
    <IonApp>
      <StyledIonContent>
        <IonSlides pager={false} options={slideOpts}>
          <IonSlide>
            <Wrapper>
              <BigLogo />
              <OnBoardDeck />
              <p className="ion-text-center">
                MovieSync helps you and your friends find new movies to watch
                together...finally.
              </p>
            </Wrapper>
          </IonSlide>
        </IonSlides>
      </StyledIonContent>
    </IonApp>
  );
}

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
  className: "ion-padding",
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: calc(var(--global-window-inner-height) * 0.9);
`;
