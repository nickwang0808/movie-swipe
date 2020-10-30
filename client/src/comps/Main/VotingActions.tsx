import React from "react";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import DownVote from "../ButtonComps/DownVote";
import UpVote from "../ButtonComps/UpVote";

interface IVotingActionsProps {
  handleDislike: () => void;
  handleLike: () => void;
  setShowDetails: () => void;
  showDetail: string;
}

export default function VotingActions({
  handleDislike,
  handleLike,
  setShowDetails,
  showDetail,
}: IVotingActionsProps) {
  return (
    <div className="container_vote">
      <DownVote handleDislike={handleDislike} />
      <div className={sharedstyle.container_detailsbtn} onClick={setShowDetails}>
        <div
          className={`${sharedstyle.btn} ${sharedstyle.btn_details}`}
        >
          {showDetail}
        </div>
      </div>
      <UpVote handleLike={handleLike} />
    </div>
  );
}
