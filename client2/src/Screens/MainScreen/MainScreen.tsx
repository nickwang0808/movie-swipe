import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import VoteButtonGroup from "../../comp/ButtonGroups/VoteButtonGroup";
import DeckWrapper from "../../comp/Deck/DeckWrapper";
import MainPoster from "../../comp/Deck/MainPoster";
import SlideInThumb from "../../comp/Deck/SlideInThumb";
import SliderBlock from "../../comp/Deck/SliderBlock";
import { CenterLoader } from "../../comp/Misc/LoadingSpinner";
import MatchNotification from "../../comp/Modals/MatchedNotification/MatchNotification";
import parseCerts from "../../Helper/parseCerts";
import useAnimateDeck from "../../Helper/useAnimateDeck";
import useMatchModalControl from "../../Helper/useMatchModalControl";
import { IPopulatedResult } from "../../MovieTypes";
import { IAppState } from "../../store";
import MainScreenMisc from "./MainScreenMisc";

interface IProps {
  setShowDetailModal: (args: number) => void;
}

export default function MainScreen({ setShowDetailModal }: IProps) {
  // const _ = useTimeOutStateChange();
  const { movieList, status, error } = useSelector(
    (state: IAppState) => state.movieList
  );
  const { notification } = useSelector(
    (state: IAppState) => state.notification
  );

  const delNotificationHOF = useMatchModalControl(notification);

  // prettier-ignore
  const {setStartPosition,startPosition,swipeDistance,VoteWithAnimation,thumbMotionValue,thumbOpacity,thumbOpacityMotionValue,thumbX,xMotionValue,likeSlider,backgroundSlide,}
   = useAnimateDeck();

  const handleVote = (isLike: boolean, movie = movieList[0]) => {
    if ("release_dates" in movieList[0]) {
      VoteWithAnimation(isLike, movie as IPopulatedResult);
    }
  };

  // console.log("main scree render");

  if (status === "failed")
    return <h2>Something Wrong happened, refresh or restart the App</h2>;
  if (movieList.length === 0 && (status === "loading" || status === "idle"))
    return <CenterLoader />;
  return (
    <>
      {notification && (
        <MatchNotification
          movie={notification}
          closeModal={() => delNotificationHOF()}
        />
      )}

      <MainScreenMisc imgUrl={movieList[0]?.poster_path || ""} />
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
                  additionalInfo={
                    "release_dates" in movie
                      ? {
                          certs: parseCerts(movie.release_dates),
                          runTime: movie.runtime,
                          genreIds: movie.genre_ids,
                          year: String(movie.release_date).slice(0, 4),
                        }
                      : undefined
                  }
                />
              </StyledMotionDiv>
            );
          })
          .reverse()}
      </DeckWrapper>

      <VoteButtonGroup
        MiddleButtonText="Details"
        handleLike={() => handleVote(true)}
        handleDislike={() => handleVote(false)}
        handleClickMiddleButton={() => setShowDetailModal(movieList[0].id)}
      />
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
