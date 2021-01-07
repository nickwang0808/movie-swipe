import {
  IonContent,
  IonFooter,
  useIonViewDidEnter,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import VoteButtonGroupV2 from "../../comp/ButtonGroups/VoteButtonGroupV2";
import DeckWrapper from "../../comp/Deck/DeckWrapper";
import MainPoster from "../../comp/Deck/MainPoster";
import SlideInThumb from "../../comp/Deck/SlideInThumb";
import SliderBlock from "../../comp/Deck/SliderBlock";
import { CenterLoader } from "../../comp/Misc/LoadingSpinner";
import MatchNotification from "../../comp/Modals/MatchedNotification/MatchNotification";
import useNotificationListener from "../../firebase/FirestoreListeners/useNotificationListener";
import baseUrl from "../../Helper/TmdbBaseUrl";
import useAnimateDeck from "../../Helper/useAnimateDeck";
import useMatchModalControl from "../../Helper/useMatchModalControl";
import {
  setModalToShow,
  setTrailerToShow,
} from "../../redux/DetailsScreenState/DetailsScreenReducer";
import { populateMovieDetailsThunk } from "../../redux/MovieList/populateMovieDetailsThunk";
import { IAppState } from "../../store";
import MainScreenMisc from "./MainScreenMisc";

interface IProps {
  animationControls: ReturnType<typeof useAnimateDeck>;
  handleVote: (arg: boolean) => void;
}

export default function MainScreen({ animationControls, handleVote }: IProps) {
  // const _ = useTimeOutStateChange();
  const dispatch = useDispatch();
  const { movieList, status, error } = useSelector(
    (state: IAppState) => state.movieList
  );
  const { notification } = useSelector(
    (state: IAppState) => state.notification
  );

  const { delNotificationHOF } = useMatchModalControl(notification);

  useIonViewWillEnter(() => {
    if (movieList.length > 0) {
      if ("videos" in movieList[0] === false) {
        dispatch(populateMovieDetailsThunk());
      }
    }
  });

  const {
    setStartPosition,
    startPosition,
    swipeDistance,
    thumbMotionValue,
    thumbOpacity,
    thumbOpacityMotionValue,
    thumbX,
    xMotionValue,
    likeSlider,
    backgroundSlide,
  } = animationControls;

  useNotificationListener();

  // framer bug: card won't scale stack when trail card layout inited with true
  const [toggleLayout, setToggleLayout] = useState(false);
  useIonViewDidEnter(() => setToggleLayout(true));
  useIonViewWillLeave(() => setToggleLayout(false));

  if (status === "failed")
    return <h2>Something Wrong happened, refresh or restart the App</h2>;
  if (movieList.length === 0 && (status === "loading" || status === "idle"))
    return <CenterLoader />;
  return (
    <>
      <IonContentWithBG bg={movieList[0]?.poster_path || ""} fullscreen>
        {notification && (
          <MatchNotification
            movie={notification}
            closeModal={() => delNotificationHOF()}
          />
        )}

        <MainScreenMisc />
        <SliderBlock type="like" backgroundSlide={backgroundSlide} />
        <SliderBlock type="dislike" backgroundSlide={backgroundSlide} />
        <SlideInThumb type="like" thumbX={thumbX} thumbOpacity={thumbOpacity} />
        <SlideInThumb
          type="dislike"
          thumbX={thumbX}
          thumbOpacity={thumbOpacity}
        />

        {/* layout animation does not work across children components */}

        <DeckWrapper>
          {movieList
            .slice(0, 4)
            .map((movie, i) => {
              if (i !== 0)
                return (
                  <StyledMotionDiv
                    key={movie.id}
                    style={{
                      scale: 1 - i * 0.07,
                      originY: 1,
                      top: 4 * i,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "circOut",
                    }}
                    layout={toggleLayout}
                  >
                    <MainPoster imgUrl={movie.poster_path as string} />
                  </StyledMotionDiv>
                );

              return (
                <StyledMotionDiv
                  key={movie.id}
                  drag
                  onViewportBoxUpdate={(_, delta) => {
                    likeSlider.set(delta.x.translate);
                    thumbMotionValue.set(delta.x.translate);
                    thumbOpacityMotionValue.set(delta.x.translate);
                  }}
                  onDragStart={(e, info) => {
                    const xPosition = info.point.x;
                    setStartPosition(xPosition);
                  }}
                  onDragEnd={(e, info) => {
                    const xPosition = info.point.x;
                    if (startPosition) {
                      xPosition > (startPosition as number) + swipeDistance &&
                        handleVote(true);
                      xPosition < (startPosition as number) - swipeDistance &&
                        handleVote(false);
                    }
                  }}
                  dragElastic={1}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  style={{
                    originY: 1,
                    top: 4 * i,
                    scale: 1 - i * 0.07,
                    x: xMotionValue,
                  }}
                  layout
                  transition={{
                    duration: 0.5,
                    ease: "circOut",
                  }}
                >
                  <MainPoster
                    imgUrl={movie.poster_path}
                    showAdditionalInfo
                    movieInfo={"videos" in movie ? movie : undefined}
                  />
                </StyledMotionDiv>
              );
            })
            .reverse()}
        </DeckWrapper>
      </IonContentWithBG>

      <IonFooter mode="ios">
        <VoteButtonGroupV2
          handleLike={() => handleVote(true)}
          handleDislike={() => handleVote(false)}
          handleDetails={() => dispatch(setModalToShow(movieList[0].id))}
          handleTrailer={() => dispatch(setTrailerToShow(movieList[0].id))}
          disableDetails={!("videos" in movieList[0])}
          disableTrailer={!("videos" in movieList[0])}
        />
        <div className="ion-margin" />
      </IonFooter>
    </>
  );
}

export const StyledMotionDiv = styled(motion.div)`
  position: absolute;
  width: 100vw;
  height: var(--poster-height);
  margin: 0 auto;
  left: 0;
  right: 0;
`;

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
