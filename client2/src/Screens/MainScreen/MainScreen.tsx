import { animate, useMotionValue, useTransform } from "framer-motion";
import React from "react";
import VoteButtonGroup from "../../comp/ButtonGroups/VoteButtonGroup";
import DeckWrapper from "../../comp/Deck/DeckWrapper";
import LeadCard from "../../comp/Deck/LeadCard";
import SlideInThumb from "../../comp/Deck/SlideInThumb";
import SliderBlock from "../../comp/Deck/SliderBlock";
import TrailCards from "../../comp/Deck/TrailCards";
import { dummyMovieList } from "../../DevTools/dummyData";
import useGetWIndowsSizing from "../../Helper/useGetWIndowsSizing";
import MainScreenMisc from "./MainScreenMisc";

export default function MainScreen() {
  const { width: screenWidth } = useGetWIndowsSizing();

  const xMotionValue = useMotionValue(0); // to control the deck via button
  const likeSlider = useMotionValue(0); // let deck control slider
  const backgroundSlide = useTransform(likeSlider, (value) => value * 2.5);

  const thumbMotionValue = useMotionValue(0); // let deck control thumb
  const thumbX = useTransform(thumbMotionValue, (value) => value / 1.5);
  const thumbOpacityMotionValue = useMotionValue(0);
  const thumbOpacity = useTransform(
    thumbOpacityMotionValue,
    (value) => Math.abs(value / 300) // the higher num the slower it adds opacity
  );

  const animateSliderAndThumb = (direction: number, thumbDirection: 1 | -1) => {
    animate(likeSlider, direction * 1.2, {
      type: "tween",
      duration: 1,
      ease: [0.33, 1, 0.68, 1],
      onComplete: () => {
        likeSlider.set(0); // don't remove this
      },
    });

    // this controls where the thumb to animate to
    animate(thumbMotionValue, screenWidth * thumbDirection, {
      type: "tween",
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    });

    // this controls thumb opacity
    animate(thumbOpacityMotionValue, [300, 0], {
      ease: "easeIn",
      duration: 0.5,
      onComplete: () => {},
    });
  };

  const VoteWithAnimation = (isLike: boolean) => {
    animate(xMotionValue, isLike ? screenWidth : -screenWidth, {
      type: "tween",
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      onComplete: () => {
        xMotionValue.set(0);
      },
    });
    animateSliderAndThumb(isLike ? screenWidth : -screenWidth, isLike ? 1 : -1);
  };

  return (
    <div>
      <MainScreenMisc imgUrl={dummyMovieList.results[0].poster_path} />

      <SliderBlock type="like" backgroundSlide={backgroundSlide} />
      <SliderBlock type="dislike" backgroundSlide={backgroundSlide} />
      <SlideInThumb type="like" thumbX={thumbX} thumbOpacity={thumbOpacity} />
      <SlideInThumb
        type="dislike"
        thumbX={thumbX}
        thumbOpacity={thumbOpacity}
      />

      <DeckWrapper>
        {dummyMovieList.results
          .slice(0, 4)
          .map((movie, i) => {
            if (i !== 0)
              return (
                <TrailCards
                  key={movie.id}
                  index={i}
                  imgUrl={movie.poster_path}
                />
              );

            return (
              <LeadCard
                key={movie.id}
                index={i}
                imgUrl={movie.poster_path}
                likeSlider={likeSlider}
                thumbMotionValue={thumbMotionValue}
                thumbOpacityMotionValue={thumbOpacityMotionValue}
                xMotionValue={xMotionValue}
                screenWidth={screenWidth}
                VoteWithAnimation={VoteWithAnimation}
              />
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
    </div>
  );
}
