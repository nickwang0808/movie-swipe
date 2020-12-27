import React from "react";
import styled from "styled-components/macro";
import EyeIcon from "../../Assets/svg/EyeIcon";

export default function WatchedTag({ name }: { name: string[] }) {
  return (
    <Wrapper>
      <EyeIcon />
      <p>{name.join(", ")}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;

  & p {
    font-size: 1.6rem;
    margin-left: 1rem;
    line-height: 2rem;
  }
`;
