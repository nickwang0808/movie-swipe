import React from "react";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import DownVote from "../ButtonComps/DownVote";
import UpVote from "../ButtonComps/UpVote";
import { motion } from "framer-motion";
interface IVotingActionsProps {
  handleDislike: () => void;
  handleLike: () => void;
  forceActiveLikeButton?: boolean;
  forceActiveDislikeButton?: boolean;
  handleClickMiddleButton: () => void;
  MiddleButtonText: string;
}

export default function VotingActions({
  handleDislike,
  handleLike,
  forceActiveDislikeButton = false,
  forceActiveLikeButton = false,
  handleClickMiddleButton,
  MiddleButtonText,
}: IVotingActionsProps) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="container_vote"
    >
      <DownVote
        handleDislike={handleDislike}
        forceActive={forceActiveDislikeButton}
      />
      <div className={sharedstyle.container_detailsbtn}>
        <div
          onClick={handleClickMiddleButton}
          className={`${sharedstyle.btn} ${sharedstyle.btn_details}`}
        >
          {MiddleButtonText}
        </div>
      </div>
      <UpVote handleLike={handleLike} forceActive={forceActiveLikeButton} />
    </motion.div>
  );
}
