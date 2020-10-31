import React from "react";
import style from "./ButtonComps.module.css";
import sharedstyle from "../profile/MyProfile.module.css";
import DownVote from "../ButtonComps/DownVote";
import UpVote from "../ButtonComps/UpVote";

interface IListViewPendingInvite {
  name: React.ReactNode;
  action?: () => void;
}

export default function ListViewPendingInvite({ name, action }: IListViewPendingInvite) {
  if (action) {
    return (
      <div className={style.btn_listview} onClick={action}>
        {name}
      </div>
    );
  } else {
    return (
    <div className={style.btn_listviewUser}>
      {name}
      <div className={style.container_invitebtns}>
        {/* <DownVote handleDislike={}/> */}
        {/* <UpVote handleLike={}/> */}
        {/* TODO: Hook These Up */}
      </div>
    </div>
    )}
}
