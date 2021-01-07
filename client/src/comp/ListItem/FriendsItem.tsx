import React from "react";
import styled from "styled-components/macro";
import TrashCan from "../../Assets/svg/TrashCan";
import { IProfileDetails } from "../../redux/Profile/profileReducer";

interface IListViewButton {
  friend: IProfileDetails;
  deleteFriend: (arg: IProfileDetails) => void;
}

export default function FriendsItem({ friend, deleteFriend }: IListViewButton) {
  return (
    <Wrapper>
      {friend.displayName || friend.email || friend.uid}
      <TrashCan onClick={() => deleteFriend(friend)} />
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
