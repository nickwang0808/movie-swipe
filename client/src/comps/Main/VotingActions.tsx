import React from "react";
import { Link } from "react-router-dom";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import DownVote from "../ButtonComps/DownVote";
import UpVote from "../ButtonComps/UpVote";

interface IVotingActionsProps {
  handleDislike: () => void;
  handleLike: () => void;
  showDetail: string;
  goTo: string;
}

export default function VotingActions({
  handleDislike,
  handleLike,
  showDetail,
  goTo,
}: IVotingActionsProps) {
  return (
    <div className="container_vote">
      <DownVote handleDislike={handleDislike} />
      <div className={sharedstyle.container_detailsbtn}>
        <Link
          to={goTo}
          className={`${sharedstyle.btn} ${sharedstyle.btn_details}`}
        >
          {showDetail}
        </Link>
      </div>
      <UpVote handleLike={handleLike} />
    </div>
  );
}
