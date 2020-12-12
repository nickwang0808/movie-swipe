import { IonContent, IonPage } from "@ionic/react";
import { motion } from "framer-motion";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import styled from "styled-components";
import VoteButtonGroup from "../../comp/ButtonGroups/VoteButtonGroup";
import DeckWrapper from "../../comp/Deck/DeckWrapper";
import MainPoster from "../../comp/Deck/MainPoster";
import SlideInThumb from "../../comp/Deck/SlideInThumb";
import SliderBlock from "../../comp/Deck/SliderBlock";
import { dummyMovieList } from "../../DevTools/dummyData";
import { likedAndDislikedIds } from "../../Helper/firestoreListenerMakers";
import useAnimateDeck from "../../Helper/useAnimateDeck";
import fetchMovie from "../../redux/MovieList/fetchMovieThunk";
import { IAppState } from "../../store";
import MainScreenMisc from "./MainScreenMisc";

export default function MainScreen() {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(fetchMovie());
  }, []);
  // prettier-ignore
  const {setStartPosition,startPosition,swipeDistance,VoteWithAnimation,thumbMotionValue,thumbOpacity,thumbOpacityMotionValue,thumbX,xMotionValue,likeSlider,backgroundSlide,} = useAnimateDeck();
  useFirestoreConnect(likedAndDislikedIds());
  const { movieList } = useSelector((state: IAppState) => state.movieList);

  return (
    <IonPage>
      <IonContent>
        <MainScreenMisc imgUrl={dummyMovieList.results[0].poster_path} />
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
                    layout
                  >
                    <MainPoster imgUrl={movie.poster_path} />
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
                      if (
                        xPosition >
                        (startPosition as number) + swipeDistance
                      ) {
                        VoteWithAnimation(true);
                      } else if (
                        xPosition <
                        (startPosition as number) - swipeDistance
                      ) {
                        VoteWithAnimation(false);
                      }
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
                  <MainPoster imgUrl={movie.poster_path} />
                </StyledMotionDiv>
              );
            })
            .reverse()}
        </DeckWrapper>

        <VoteButtonGroup
          MiddleButtonText="Details"
          handleLike={() => VoteWithAnimation(true)}
          handleDislike={() => VoteWithAnimation(false)}
          handleClickMiddleButton={() => console.log("goto detials")}
        />
      </IonContent>
    </IonPage>
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
