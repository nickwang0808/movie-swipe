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
    <div className={style.container_allcontent}>
      <div className={style.container_header}>
        <h1>
          <BackButton linkTo="/profile" />
          Friends
        </h1>
      </div>
      <div className={style.container_subcontent}>
        <h2 className={style.title_bold}>
          Invite your friends and we’ll let you know when there’s something to
          watch together!
        </h2>
        <PendingInvite
          handleAccept={handleAccept}
          handleDecline={handleDecline}
        />
        {/* TODO: Hide this if no pending invites exist */}
      <div className={style.container_subcontent}>
      <div className={`${"title"} ${"marginBottom2"}`}>
            <h2>Friends</h2>
          </div>
          <ListViewFriendsButton name="Zangmann@Gmail.com" />
          <ListViewFriendsButton name="Studio@No-Tec.com" />
        </div>
        <div className={style.container_subcontent}>

        <div className={`${"title"} ${"marginBottom2"}`}>
            <h2>Invite New Friends</h2>
          </div>
          <div className={style.container_inset}>
            <div className={style.invite_input_container}>
                <input
                className={style.input_invite}
                type="text"
                placeholder="Enter email..."
              />
              <div className={`${sharedstyle.btn} ${sharedstyle.btnInvite}`}>
                Invite
              </div>
              <div></div>
            </div>
            <p className={style.error}>This person is already on your friend's list.</p>
          </div>

          {/* TODO: Toggle Message visibility. class="success" will appear when a message goes though */}
        </div>
      </div>
    </div>
  );
}
