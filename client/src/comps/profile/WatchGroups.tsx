import React, { useContext } from "react";
import style from "./MyProfile.module.css";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import ListViewFriendsButton from "../ButtonComps/ListViewFriendsButton";
import PendingInvite from "./PendingInvite";
import BackButton from "../ButtonComps/BackButton";
import { UserContext } from "../../store";

interface IWatchGroups {
  // handleBack: () => void;
}

export default function WatchGroups({}: /* handleBack */ IWatchGroups) {
  const { userAuth } = useContext(UserContext);

  const handleAccept = () => {
    console.log("accept");
  };
  const handleDecline = () => {
    console.log("Decline");
  };

  return (
    <div className={style.container_friendsscreen}>
      <div className={style.container_header}>
        <h1>
          <BackButton linkTo="/profile" />
          Watch Groups
        </h1>
      </div>
      <div className={style.container_friendscontent}>
        <h2 className={style.friends_title}>
          Invite your friends and we’ll let you know when there’s something to
          watch together!
        </h2>
        <PendingInvite
          handleAccept={handleAccept}
          handleDecline={handleDecline}
        />
        {/* TODO: Hide this if no pending invites exist */}
        <div className={style.container_friends}>
          <div className={style.title}>
            <h2>Friends</h2>
          </div>
          <ListViewFriendsButton name="Zangmann@Gmail.com" />
          <ListViewFriendsButton name="Studio@No-Tec.com" />
        </div>
        <div>
          <div className={style.title}>
            <h2>Invite New Friends</h2>
          </div>
          <div className={style.container_invite}>
            <input
              className={style.input_invite}
              type="text"
              placeholder="Enter friend's email..."
            />
            <div className={`${sharedstyle.btn} ${sharedstyle.btnInvite}`}>
              Invite
            </div>
          </div>
          <p className={style.error}>
            This person is already on your friend's list.
          </p>
          {/* TODO: Toggle Message visibility. class="success" will appear when a message goes though */}
        </div>
      </div>
    </div>
  );
}
