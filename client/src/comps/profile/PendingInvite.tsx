import React from "react";
import style from "./MyProfile.module.css";
import ListViewPendingInvite from "../ButtonComps/ListViewPendingInvite.module";


export default function PendingInvite() {
  return (
    <div className={style.container_pendinginvites}>
        <div className={style.title}>
            <h2>Incoming Invites</h2>
        </div>
        <ListViewPendingInvite name="NickWangTech@Gmail.com" />

        <ListViewPendingInvite name="NickWangTech@Gmail.com" />
    </div>
  );
}
