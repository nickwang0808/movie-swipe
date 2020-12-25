import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import styled from "styled-components/macro";
import MainHeader from "../../comp/Layout/MainHeader";
import { Btn } from "../../theme/BaseComp";

export default function AboutUs() {
  return (
    <IonPage>
      <MainHeader title="About Movie Sync" />
      <IonContent>
        <SubContent>
          <p>
            MovieSync is an easy way to find something new for you and your
            friends to watch together, finally.
          </p>
          <p className="ion-margin-top">
            It's developed by Nick Wang (NickWangTech.com) and designed by
            Trevor Wernisch (No-Tec.com).
          </p>
        </SubContent>
        <Separator />
        <SubContent>
          <h2 className="ion-margin-bottom">Need to chat?</h2>
          <Btn>Hello@Movie-Sync.com</Btn>
        </SubContent>
        <SubContent>
          <h2 className="ion-margin-bottom">Contributions</h2>
          <img
            src={
              "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
            }
            alt="tmdb logo"
          />
          <p>
            This product uses the TMDb API but is not endorsed or certified by
            TMDb.
          </p>
        </SubContent>
      </IonContent>
    </IonPage>
  );
}

const SubContent = styled.div.attrs({
  className: "ion-padding",
})``;

const Separator = styled.div.attrs({
  className: "listview_separator_full",
})``;
