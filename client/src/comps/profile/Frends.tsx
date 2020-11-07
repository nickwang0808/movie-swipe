import React, { useContext, useEffect, useState } from "react";
import style from "./MyProfile.module.css";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import ListViewFriendsButton from "../ButtonComps/ListViewFriendsButton";
import PendingInvite from "./PendingInvite";
import BackButton from "../ButtonComps/BackButton";
import { UserContext } from "../../store";
import { cloudFn } from "../../firebase/config";

export default function Friends() {
  const { userAuth, userProfile } = useContext(UserContext);

  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState(false);
  const [disableInvite, setDisableInvite] = useState(false);

  const handleInvite = async () => {
    if (emailInput === userAuth?.userInfo.email) {
      console.log("you can't add yourself as friend");
    } else if (emailInput.length === 0) {
      console.log("please input email");
    } else {
      setDisableInvite(true);
      const frienReqStatus = await cloudFn.httpsCallable("sendFriendReq")({
        email: emailInput,
      });
      console.log("Friends -> frienReqStatus", frienReqStatus.data.message);

      setMessage(frienReqStatus.data.message);
      setDisableInvite(false);
    }
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
        {userProfile?.pending_received && (
          <PendingInvite pendingReceived={userProfile?.pending_received} />
        )}

        {userProfile?.friends && (
        <div className="container_subcontent">
          <div className={`${"title"}`}>
            <div className="listview_separator_full" />
            <h2>Friends</h2>
          </div>
          {userProfile &&
            userProfile.friends.map((user) => {
              return <ListViewFriendsButton name={user.email} key={user.id} />;
            })}
        </div>
        )}
        
        <div className="container_subcontent">
          <div className={`${"title"}`}>
            <div className="listview_separator_full" />
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
              <button
                disabled={disableInvite}
                onClick={handleInvite}
                className={`${sharedstyle.btn}`}
              >
                Invite
              </button>
            </div>
            {message && <p className={style.error}>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
