import React from "react";
import styled from "styled-components";

export default function Divider() {
  return <StyledHr />;
}

const StyledHr = styled.hr`
  border-top: 1px solid #9e9e9e;
`;
