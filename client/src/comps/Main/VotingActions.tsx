import React from "react";
import { Link } from "react-router-dom";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import DownVote from "../ButtonComps/DownVote";
import UpVote from "../ButtonComps/UpVote";
import { motion } from "framer-motion";
interface IVotingActionsProps {
  handleDislike: () => void;
  handleLike: () => void;
  showDetail: string;
  goTo: string;
  isLiked?: boolean;
  changeToDisLike?: () => void;
}

export default function VotingActions({
  handleDislike,
  handleLike,
  showDetail,
  goTo,
  isLiked,
  changeToDisLike,
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
        changeToDisLike={changeToDisLike}
      />
      <div className={sharedstyle.container_detailsbtn}>
        <Link
          to={goTo}
          className={`${sharedstyle.btn} ${sharedstyle.btn_details}`}
        >
          {showDetail}
        </Link>
      </div>
      <UpVote handleLike={handleLike} isLiked={isLiked} />
    </motion.div>
  );
}
