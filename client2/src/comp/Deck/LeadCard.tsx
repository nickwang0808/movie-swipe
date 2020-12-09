import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import MainPoster from "./MainPoster";

interface IProps {
  key: number;
  imgUrl: string;
  index: number;
}

export default function LeadCard({ imgUrl, key, index }: IProps) {
  return (
    <StyledMotionDiv
      key={key}
      drag
      onViewportBoxUpdate={(_, delta) => {
        // likeSlider.set(delta.x.translate);
        // thumbMotionValue.set(delta.x.translate);
        // thumbOpacityMotionValue.set(delta.x.translate);
      }}
      onDragStart={(e, info) => {
        // const xPosition = info.point.x;
        // setStartPosition(xPosition);
      }}
      onDragEnd={(e, info) => {
        // const xPosition = info.point.x;
        // if (startPosition) {
        //   if (xPosition > (startPosition as number) + swipeDistance) {
        //     animate(xMotionValue, screenWidth, {
        //       type: "tween",
        //       duration: 0.5,
        //       ease: [0.16, 1, 0.3, 1],
        //       onComplete: () => {
        //         xMotionValue.set(0);
        //         /* not pulling it out because handlelike is a pain is the
        //     ass to assign types  */
        //         handleLike(movie.id, movie.poster_path, movie.title);
        //       },
        //     });
        //     animateSliderAndThumb(screenWidth, 1);
        //   } else if (xPosition < (startPosition as number) - swipeDistance) {
        //     animate(xMotionValue, -screenWidth, {
        //       type: "tween",
        //       duration: 0.5,
        //       ease: [0.16, 1, 0.3, 1],
        //       onComplete: () => {
        //         xMotionValue.set(0);
        //         handleDislike(movie.id);
        //       },
        //     });
        //     animateSliderAndThumb(-screenWidth, -1);
        //   }
        // }
      }}
      dragElastic={1}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      style={{
        originY: 1,
        top: 4 * index,
        scale: 1 - index * 0.07,
        // x: xMotionValue,
      }}
      layout
      transition={{
        duration: 0.5,
        ease: "circOut",
      }}
    >
      <MainPoster imgUrl={imgUrl} />
    </StyledMotionDiv>
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
