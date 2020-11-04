import React, { useContext, useState } from "react";
import style from "./MyProfile.module.css";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import ListViewFriendsButton from "../ButtonComps/ListViewFriendsButton";
import PendingInvite from "./PendingInvite";
import BackButton from "../ButtonComps/BackButton";
import { UserContext } from "../../store";
import { cloudFn } from "../../firebase/config";

export default function Friends() {
  const { userAuth } = useContext(UserContext);

  const [emailInput, setEmailInput] = useState("");

  const handleAccept = () => {
    console.log("accept");
  };
  const handleDecline = () => {
    console.log("Decline");
  };

  const handleInvite = () => {
    console.log("run cloud fn");
    cloudFn.httpsCallable("sendFriendReq")({ email: emailInput });
    // cloudFn.httpsCallable("test")();
  };

  return (
    <div className="container_allcontent">
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
        <div className="container_subcontent">
          <div className={`${"title"}`}>
            <h2>Friends</h2>
          </div>
          <ListViewFriendsButton name="Zangmann@Gmail.com" />
          <ListViewFriendsButton name="Studio@No-Tec.com" />
        </div>
        <div className="container_subcontent">
          <div className={`${"title"}`}>
            <h2>Invite New Friends</h2>
          </div>
          <div className={style.container_inset}>
            <div className={style.invite_input_container}>
              <input
                className={style.input_invite}
                type="text"
                placeholder="Enter email..."
                onChange={(e) => setEmailInput(e.target.value)}
                value={emailInput}
              />
              <div
                onClick={handleInvite}
                className={`${sharedstyle.btn} ${sharedstyle.btnInvite}`}
              >
                Invite
              </div>
              <div></div>
            </div>
            <p className={style.error}>
              This person is already on your friend's list.
            </p>
          </div>

          {/* TODO: Toggle Message visibility. class="success" will appear when a message goes though */}
        </div>
      </div>
    </div>
  );
}
