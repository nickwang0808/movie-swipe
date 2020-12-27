import { motion, MotionValue } from "framer-motion";
import React from "react";
import styled, { css } from "styled-components/macro";

interface StyleProp {
  type: "like" | "dislike";
  devMode?: boolean;
}

interface IProps extends StyleProp {
  backgroundSlide: MotionValue<number>;
}

export default function SliderBlock({
  type,
  devMode = false,
  backgroundSlide,
}: IProps) {
  let skew;
  if (type === "like") {
    skew = "-15deg";
  } else if (type === "dislike") {
    skew = "15deg";
  }

  return (
    <StyledMotionDiv
      devMode={devMode}
      type={type}
      style={{ skew, x: backgroundSlide }}
      className="VoteUpBG_anim"
    ></StyledMotionDiv>
  );
}

const StyledMotionDiv = styled(motion.div)<StyleProp>`
  position: absolute;
  top: 0;
  width: 50%;
  bottom: 0;
  /* prevent element showing up too early at 3x relative speed, kinda hacked the green one tho, something about the match behind the acceleration is not right*/
  ${(props) =>
    props.type === "like" &&
    css`
      /* comment this out for dev purpose */
      left: -100%;
      background-color: var(--positive);
    `}
  ${(props) =>
    props.type === "dislike" &&
    css`
      /* comment this out for dev purpose */
      right: -100%;
      background-color: var(--negative);
    `}

  ${(props) =>
    props.devMode &&
    css`
      right: 0;
      left: 0;
    `}

  opacity: 0.8;
`;
