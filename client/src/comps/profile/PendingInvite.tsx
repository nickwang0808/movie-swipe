import React from "react";
import style from "./MyProfile.module.css";
import ListViewPendingInvite from "../ButtonComps/ListViewPendingInvite";

interface IPendingInvite {
  handleDecline: () => void;
  handleAccept: () => void;
}

export default function PendingInvite({
  handleDecline,
  handleAccept,
}: IPendingInvite) {
  return (
    <div className="container_subcontent">
      <div className={`${"title"} ${"marginBottom2"}`}>
        <h2>Pending Invites</h2>
      </div>
      <ListViewPendingInvite
        handleDecline={handleDecline}
        handleAccept={handleAccept}
        name="NickWangTech@Gmail.com"
      />

      <ListViewPendingInvite
        handleDecline={handleDecline}
        handleAccept={handleAccept}
        name="NickWangTech@Gmail.com"
      />
    </div>
  );
}
