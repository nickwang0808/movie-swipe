import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components/macro";

interface iProps {
  number: number;
}

export default function CircleDial({ number }: iProps) {
  let color: string;
  if (number < 25) {
    color = "#FF0000";
  } else if (number < 50) {
    color = "#ED7200";
  } else if (number < 75) {
    color = "#0085D0";
  } else {
    color = "#199935";
  }

  return (
    <StyledDiv>
      <CircularProgressbarWithChildren
        value={number}
        // background={true}
        // backgroundPadding={8}
        strokeWidth={8}
        styles={buildStyles({
          pathColor: color,
          trailColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "black",
          textSize: "5rem",
        })}
      >
        <div>{number}</div>
      </CircularProgressbarWithChildren>
      
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  /* control the size here */
  height: 34px;
  width: 34px;
  margin-right: 8px;
  flex-shrink: 0;

  & div {
    font-size: 1.75rem;
  }
`;
