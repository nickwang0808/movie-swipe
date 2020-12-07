import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import DetailsButton from "../Buttons/DetailsButton";
import ThumbVoteButton from "../Buttons/ThumbVoteButton";
interface IVotingActionsProps {
  handleDislike: () => void;
  handleLike: () => void;
  forceActiveLikeButton?: boolean;
  forceActiveDislikeButton?: boolean;
  handleClickMiddleButton: () => void;
  MiddleButtonText: string;
}

export default function VoteButtonGroup({
  handleDislike,
  handleLike,
  forceActiveDislikeButton = false,
  forceActiveLikeButton = false,
  handleClickMiddleButton,
  MiddleButtonText,
}: IVotingActionsProps) {
  const [disabled, setDisabled] = useState(false);

  const onClick = async (isLike: boolean) => {
    if (disabled) {
      return;
    }
    setDisabled(true);
    isLike ? handleLike() : handleDislike();
    setTimeout(() => {
      setDisabled(false);
    }, 800);
  };

  return (
    <Wrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <ThumbVoteButton
        onClick={() => onClick(false)}
        disabled={disabled}
        forceActive={forceActiveDislikeButton}
        isThumbUp={false}
      />
      <DetailsButton
        handleClickMiddleButton={handleClickMiddleButton}
        MiddleButtonText={MiddleButtonText}
      />
      <ThumbVoteButton
        onClick={() => onClick(true)}
        disabled={disabled}
        forceActive={forceActiveLikeButton}
        isThumbUp
      />
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  z-index: 998;
  position: absolute;
  bottom: var(--nav);
  width: 100%;
  height: 10rem;
`;
