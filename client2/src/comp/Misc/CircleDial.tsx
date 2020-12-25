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
    color = "#d01f00";
  } else if (number < 50) {
    color = "#d0c200";
  } else if (number < 75) {
    color = "#a3d000";
  } else {
    color = "#00d023";
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
      ;
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
    font-weight: 500;
    font-size: 12px;
    color: black};
  }
`;
