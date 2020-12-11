import React, { useEffect, useState } from "react";
import VoteButtonGroup from "../../comp/ButtonGroups/VoteButtonGroup";
import DeckWrapper from "../../comp/Deck/DeckWrapper";
import LeadCard from "../../comp/Deck/LeadCard";
import SlideInThumb from "../../comp/Deck/SlideInThumb";
import SliderBlock from "../../comp/Deck/SliderBlock";
import TrailCards from "../../comp/Deck/TrailCards";
import { dummyMovieList } from "../../DevTools/dummyData";
import useAnimateDeck from "../../Helper/useAnimateDeck";
import useGetWIndowsSizing from "../../Helper/useGetWIndowsSizing";
import MainScreenMisc from "./MainScreenMisc";

export default function MainScreen() {
  // eslint-disable-next-line
  const [_, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const { width: screenWidth } = useGetWIndowsSizing();
  // prettier-ignore
  const {VoteWithAnimation,thumbMotionValue,thumbOpacity,thumbOpacityMotionValue,thumbX,xMotionValue,likeSlider,backgroundSlide,} = useAnimateDeck(screenWidth);

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
