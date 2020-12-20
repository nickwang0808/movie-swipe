import { IonImg } from "@ionic/react";
import React from "react";
import styled from "styled-components/macro";
import apple from "../../Assets/img/logo_apple.png";
import cbs from "../../Assets/img/logo_cbs.png";
import disney from "../../Assets/img/logo_disney.png";
import hbomax from "../../Assets/img/logo_hbomax.png";
import hbonow from "../../Assets/img/logo_hbonow.png";
import hulu from "../../Assets/img/logo_hulu.png";
import imdb from "../../Assets/img/logo_imdb.png";
import netflix from "../../Assets/img/logo_netflix.png";
import peacock from "../../Assets/img/logo_peacock.png";
import prime from "../../Assets/img/logo_prime.png";
import quibi from "../../Assets/img/logo_quibi.png";
import showtime from "../../Assets/img/logo_showtime.png";
import starz from "../../Assets/img/logo_starz.png";
import tmdb from "../../Assets/img/logo_tmdb.svg";

const providerLogos = {
  apple,
  hbomax,
  imdb,
  prime,
  starz,
  cbs,
  hbonow,
  netflix,
  quibi,
  tmdb,
  disney,
  hulu,
  peacock,
  showtime,
};

interface IProps {
  providers: string[];
}

export default function Providers({ providers }: IProps) {
  return (
    <div className="ion-padding-horizontal">
      <Title>Available On:</Title>
      <Wrapper>
        <IonImg src={providerLogos.apple} />
        <IonImg src={providerLogos.imdb} />
        <IonImg src={providerLogos.hulu} />
        <IonImg src={providerLogos.peacock} />
        <IonImg src={providerLogos.cbs} />
      </Wrapper>
    </div>
  );
}

const Title = styled.h3.attrs({
  className: "ion-margin-vertical",
})`
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(97.76px, 1fr));
  gap: 8px;

  & ion-img {
    height: 44px;
    width: 97.76px;

    background: #ffffff;
    border: 3px solid #000000;
    box-sizing: border-box;
    border-radius: 7px;
  }
`;
