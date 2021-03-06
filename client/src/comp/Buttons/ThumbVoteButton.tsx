import React from "react";
import styled from "styled-components/macro";
import ThumbDownForButton from "../../Assets/svg/ThumbDownForButton";
import ThumbUpForButton from "../../Assets/svg/ThumbUpForButton";
import { Btn } from "../../theme/BaseComp";

interface IProps {
  forceActive?: boolean;
  disabled?: boolean;
  onClick: () => void;
  isThumbUp: boolean;
}

export default function ThumbVoteButton({
  forceActive = false,
  disabled = false,
  onClick,
  isThumbUp,
}: IProps) {
  return (
    <OuterButton disabled={disabled || forceActive} onClick={onClick}>
      <IconWrapper forceActive={forceActive} isThumbUp={isThumbUp}>
        {isThumbUp ? <ThumbUpForButton /> : <ThumbDownForButton />}
      </IconWrapper>
    </OuterButton>
  );
}

const OuterButton = styled.button`
  // margin: 0 2rem;
  height: 100%;
  display: flex;
  background: transparent;

  border: none;
  outline: none;
`;

const IconWrapper = styled(Btn)<{ forceActive: boolean; isThumbUp: boolean }>`
  width: fit-content;
  /* margin-right: 1rem; */
  padding: 0 3rem;

  border-color: ${(props) =>
    props.forceActive ? "var(--highlight)" : "var(--dark)"};
  background-color: ${(props) =>
    props.forceActive ? "var(--highlight)" : "var(--dark)"};

  &:active {
    background-color: var(--highlight);
    border-color: var(--highlight);
  }

  & svg {
    fill: ${(props) =>
      props.forceActive
        ? "var(--dark)"
        : props.isThumbUp
        ? "var(--positive)"
        : "var(--negative)"};
  }

  &:active svg {
    fill: var(--dark);
  }
`;
