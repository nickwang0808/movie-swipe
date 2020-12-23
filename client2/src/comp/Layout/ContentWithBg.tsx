import { IonContent } from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import baseUrl from "../../Helper/TmdbBaseUrl";
import { IAppState } from "../../store";

interface IProps {
  children: React.ReactNode;
}

export default function ContentWithBg({ children }: IProps) {
  const { poster_path } = useSelector(
    (state: IAppState) => state.movieList.movieList[0]
  );

  return (
    <IonContentWithBG bg={poster_path || "/bNo2mcvSwIvnx8K6y1euAc1TLVq.jpg"}>
      {children}
    </IonContentWithBG>
  );
}

export const IonContentWithBG = styled(IonContent)<{ bg: string }>`
  /* --background: url(${(props) => baseUrl + props.bg}); */

  &::part(background) {
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),url(${(props) => baseUrl + props.bg});

    filter: blur(8px);
    -webkit-filter: blur(8px);
    background-position: center;
    transform: scale(2);
  }
`;
