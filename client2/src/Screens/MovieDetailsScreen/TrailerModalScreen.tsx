import { IonModal, IonPage } from "@ionic/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import getTrailerUrl from "../../Helper/getTrailerUrl";
import { IMovieDetailsForDetailsExtended } from "../../MovieTypes/IDetialsScreen";
import { setTrailerToShow } from "../../redux/DetailsScreenState/DetailsScreenReducer";
import { IAppState } from "../../store";

export default function TrailerModalScreen() {
  const dispatch = useDispatch();
  const { trailerToShow } = useSelector(
    (state: IAppState) => state.detailsState
  );
  const youtubeVidKey = useSelector(
    (state: IAppState) =>
      (state.movieList
        .movieList[0] as IMovieDetailsForDetailsExtended)?.videos.results.find(
        (elem) => elem.key
      )?.key
  );

  return (
    <StyledModal showBackdrop isOpen={Boolean(trailerToShow)}>
      <IonPage
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            console.log("clicked");
            dispatch(setTrailerToShow(null));
          }
        }}
      >
        <TrailerWrapper>
          <iframe
            allowFullScreen={true}
            src={getTrailerUrl(youtubeVidKey as string)}
            title="trailer_vid"
            allow="autoplay"
          />
        </TrailerWrapper>
      </IonPage>
    </StyledModal>
  );
}

const StyledModal = styled(IonModal)`
  --background: none;
`;

const TrailerWrapper = styled.div`
  width: 100%;
  padding-top: 56.25%;
  background-size: cover;
  position: relative;
  margin: auto;

  & iframe {
    position: absolute;
    top: 0;
    width: 100%;
    height: 56vw;
    max-height: 100vh;
    border: 0;
  }
`;
