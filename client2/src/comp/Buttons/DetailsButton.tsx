import React from "react";
import styled from "styled-components/macro";
import { Btn } from "../../theme/BaseComp";

interface IVotingActionsProps {
  handleClickMiddleButton: () => void;
  MiddleButtonText: string;
}

export default function DetailsButton({
  handleClickMiddleButton,
  MiddleButtonText,
}: IVotingActionsProps) {
  return (
    <Wrapper>
      <TextButton onClick={handleClickMiddleButton}>
        {MiddleButtonText}
      </TextButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-grow: 1;
`;

const TextButton = styled(Btn)`
  width: 100%;
  font-size: 1.8rem;

  &:active {
    border-color: var(--highlight);
    color: var(--highlight);
  }
`;
