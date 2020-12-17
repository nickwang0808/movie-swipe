import React from "react";
import styled from "styled-components/macro";
import EyeIcon from "../../Assets/svg/EyeIcon";

export default function WatchedTag({ name }: { name: string[] }) {
  return (
    <Wrapper>
      <EyeIcon />
      <p>Watched with {name.join(", ")}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid var(--gray);
  border-top: 1px solid var(--gray);
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem 0;

  & p {
    font-size: 1.6rem;
    margin-left: 1rem;
    line-height: 2rem;
  }
`;
