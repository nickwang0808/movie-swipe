import React from "react";
import styled from "styled-components/macro";
import ThumbVoteButton from "../Buttons/ThumbVoteButton";

interface IListViewPendingInvite {
  name: string;
  handleDecline: () => void;
  handleAccept: () => void;
}

export default function PendingInviteItem({
  name,
  handleDecline,
  handleAccept,
}: IListViewPendingInvite) {
  return (
    <Wrapper>
      {name}
      <ButtonWrapper>
        <ThumbVoteButton isThumbUp={false} onClick={handleDecline} />
        <ThumbVoteButton isThumbUp={true} onClick={handleAccept} />
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem 0 0 2rem;
  font-size: 2em;
  cursor: pointer;
  border-bottom: var(--border-bottom);
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 2rem;
  overflow-wrap: anywhere;
  box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin: 1rem 0;
`;
