import React from "react";
import { StyledMotionDiv } from "./LeadCard";
import MainPoster from "./MainPoster";

interface IProps {
  key: number;
  imgUrl: string;
  index: number;
}

export default function TrailCards({ imgUrl, key, index }: IProps) {
  return (
    <StyledMotionDiv
      key={key}
      layout
      style={{
        originY: 1,
        top: 4 * index,
        scale: 1 - index * 0.07,
      }}
      transition={{
        duration: 0.5,
        ease: "circOut",
      }}
    >
      <MainPoster imgUrl={imgUrl} />
    </StyledMotionDiv>
  );
}
