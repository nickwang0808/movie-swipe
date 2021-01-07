import React from "react";
import styled from "styled-components";

export default function DividerTall() {
  return <StyledHr />;
}

const StyledHr = styled.hr`
  border-top: 1px solid rgba(0,0,0,0.1);
  margin: 3rem auto;
  width: calc(100%);
`;
