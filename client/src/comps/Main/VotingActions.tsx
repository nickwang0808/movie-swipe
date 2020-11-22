import React from "react";
import { Link } from "react-router-dom";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import DownVote from "../ButtonComps/DownVote";
import UpVote from "../ButtonComps/UpVote";
import { motion } from "framer-motion";
import { isIdentifier } from "typescript";
interface IVotingActionsProps {
  handleDislike: () => void;
  handleLike: () => void;
  showDetail: string;
  goTo: string;
  isLiked?: boolean;
  isDisliked?: boolean;
  changeToDisLike?: () => void;
  changeToLike?: () => void;
}

export default function VotingActions({
  handleDislike,
  handleLike,
  showDetail,
  goTo,
  isLiked,
  isDisliked,
  changeToDisLike,
  changeToLike,
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
        isLiked={isLiked}
        isDisliked={isDisliked}
        changeToDisLike={changeToDisLike}
      />
      <div className={sharedstyle.container_detailsbtn}>
        <Link
          to={isLiked || isDisliked ? "/mylist" : goTo}
          className={`${sharedstyle.btn} ${sharedstyle.btn_details}`}
        >
          {isLiked || isDisliked ? "Watch List" : showDetail}
        </Link>
      </div>
      <UpVote
        handleLike={handleLike}
        isLiked={isLiked}
        changeToLike={changeToLike}
      />
    </motion.div>
  );
}
