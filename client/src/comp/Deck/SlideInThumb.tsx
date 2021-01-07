import { motion, MotionValue } from "framer-motion";
import React from "react";
import styled, { css } from "styled-components/macro";
import SlideInThumbDown from "../../Assets/svg/SlideInThumbDown";
import SlideInThumbUpIcon from "../../Assets/svg/SlideInThumbUpIcon";

interface IProps {
  thumbX: MotionValue<number>;
  thumbOpacity: MotionValue<number>;
  type: "like" | "dislike";
  devMode?: boolean;
}

export default function SlideInThumb({
  type,
  devMode = false,
  thumbX,
  thumbOpacity,
}: IProps) {
  let icon;
  if (type === "like") {
    icon = <SlideInThumbUpIcon />;
  } else if (type === "dislike") {
    icon = <SlideInThumbDown />;
  }

  return (
    <StyledMotionDiv
      devMode={devMode}
      type={type}
      style={{ x: thumbX, opacity: thumbOpacity }}
    >
      {icon}
    </StyledMotionDiv>
  );
}

const StyledMotionDiv = styled(motion.div)<{
  type: "like" | "dislike";
  devMode: boolean;
}>`
  z-index: 1000;
  position: absolute;
  top: calc(40% - var(--header));
  bottom: 0;
  height: 128px;

  ${(props) =>
    props.devMode
      ? css`
          left: 0;
        `
      : props.type === "like"
      ? css`
          right: 100%;
        `
      : css`
          left: 100%;
        `}
`;
