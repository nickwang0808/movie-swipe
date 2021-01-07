import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import styled from "styled-components/macro";
import MainHeader from "../../comp/Layout/MainHeader";
import { Btn } from "../../theme/BaseComp";

export default function AboutUs() {
  return (
    <IonPage>
      <MainHeader title="About Movie-Sync" />
      <IonContent>
        <SubContent>
          <p>
            Movie-Sync is an easy way to find something new for you and your
            friends to watch together, finally.</p><br/><p> Simply invite a friend you want to watch movies or shows with
              and you'll be notified when you've both liked a movie!
          </p>
        </SubContent>
        <Separator />
        <SubContent>
          <h2 className="ion-margin-bottom">Need to chat?</h2>
          <Btn onClick={() => window.open("mailto:hello@movie-sync.com")}>
            Hello@Movie-Sync.com
          </Btn>
        </SubContent>
        <Separator />
        <SubContent>
          <h2 className="ion-margin-bottom">Contributions</h2>
          <img
            src={
              "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
            }
            alt="tmdb logo"
            width="64px"
          />
          <p>
            This product uses the TMDb API but is not endorsed or certified by
            TMDb.
          </p>
          <p className="ion-margin-top">
            Movie-Sync is from developer Nick Wang (NickWangTech.com) and designer
            Trevor Wernisch (No-Tec.com).
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
