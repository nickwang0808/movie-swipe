import React from "react";
import styled from "styled-components/macro";
import TrashCan from "../../Assets/svg/TrashCan";

interface IListViewButton {
  name: React.ReactNode;
}

export default function FriendsItem({ name }: IListViewButton) {
  return (
    <Wrapper>
      {name}
      <TrashCan onClick={() => console.log("Delete")} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-left: 2rem;
  font-size: 2em;
  height: 6rem;
  line-height: 6rem;
  border-bottom: var(--border-bottom);
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & svg {
    fill: var(--negative);
    height: 4.5rem;
    margin-right: 3rem;
  }

  & svg:active {
    fill: var(--highlight);
  }
`;
