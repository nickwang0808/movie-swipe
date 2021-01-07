import React from "react";
import { StyledMotionDiv } from "./LeadCard";
import MainPoster from "./MainPoster";

interface IProps {
  imgUrl: string;
  index: number;
}

export default function TrailCards({ imgUrl, index }: IProps) {
  return (
    <StyledMotionDiv
      style={{
        scale: 1 - index * 0.07,
        originY: 1,
        top: 4 * index,
      }}
      transition={{
        duration: 0.5,
        ease: "circOut",
      }}
      layout
    >
      <MainPoster imgUrl={imgUrl} />
    </StyledMotionDiv>
  );
}
