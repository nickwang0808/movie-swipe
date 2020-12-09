import React from "react";
import styled from "styled-components/macro";

export default function MatchTag() {
  return (
    <Wrapper>
      <ForceSkew>
        <div>MATCHED!</div>
      </ForceSkew>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0.2em 1rem 0.1rem 1rem;
  background-color: var(--positive);
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 0.3rem;
  transform: skewX(-15deg);
  width: fit-content;
  margin-bottom: 0.5rem;
`;

const ForceSkew = styled.div`
  transform: skewX(15deg);
`;
