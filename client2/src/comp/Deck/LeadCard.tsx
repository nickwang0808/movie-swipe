import { motion, MotionValue } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import MainPoster from "./MainPoster";

interface IProps {
  imgUrl: string;
  index: number;

  xMotionValue: MotionValue<number>;
  likeSlider: MotionValue<number>;
  thumbMotionValue: MotionValue<number>;
  thumbOpacityMotionValue: MotionValue<number>;
  screenWidth: number;
  VoteWithAnimation: (arg: boolean) => void;
}

export default function LeadCard({
  imgUrl,
  index,
  likeSlider,
  thumbMotionValue,
  thumbOpacityMotionValue,
  xMotionValue,
  screenWidth,
  VoteWithAnimation,
}: IProps) {
  const [startPosition, setStartPosition] = useState<number>();
  const swipeDistance = screenWidth * 0.15;

  return (
    <StyledMotionDiv
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
          if (xPosition > (startPosition as number) + swipeDistance) {
            VoteWithAnimation(true);
          } else if (xPosition < (startPosition as number) - swipeDistance) {
            VoteWithAnimation(false);
          }
        }
      }}
      dragElastic={1}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      style={{
        originY: 1,
        top: 4 * index,
        scale: 1 - index * 0.07,
        x: xMotionValue,
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
