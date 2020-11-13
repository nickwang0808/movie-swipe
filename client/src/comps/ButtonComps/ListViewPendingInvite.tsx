import React from "react";
import style from "./ButtonComps.module.css";
import sharedstyle from "../profile/MyProfile.module.css";
import DownVote from "./DownVote";
import UpVote from "./UpVote";

interface IListViewPendingInvite {
  name: string;
  action?: () => void;
  handleDecline: () => void;
  handleAccept: () => void;
}

export default function ListViewPendingInvite({
  name,
  action,
  handleDecline,
  handleAccept,
}: IListViewPendingInvite) {
  if (action) {
    return (
      <div className={style.btn_listview} onClick={action}>
        {name}
      </div>
    );
  } else {
    return (
      <div className={style.btn_listviewUser}>
        <div className={style.containerinvitename}>{name}</div>
        <div className={style.container_invitebtns}>
          <DownVote handleDislike={handleDecline} />
          <UpVote handleLike={handleAccept} />
          {/* TODO: Hook These Up */}
        </div>
      </div>
    );
  }
}
