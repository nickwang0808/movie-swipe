import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components/macro";

interface iProps {
  number: number;
}

export default function CircleDial({ number }: iProps) {
  return (
    <StyledDiv>
      <CircularProgressbar
        value={number}
        text={String(number)}
        styles={buildStyles({
          pathColor: `rgba(62, 152, 199, 1)`,
          textColor: "#f88",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
      ;
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  /* control the size here */
`;
