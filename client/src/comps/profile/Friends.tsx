import React from "react";
import style from "./MyProfile.module.css";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import ListViewFriendsButton from "../ButtonComps/ListViewFriendsButton";
import PendingInvite from "./PendingInvite";


export default function Friends() {
  return (
    <div className={style.container_friendsscreen}>
      <div className={style.container_header}>
        <h1>
            <div className={sharedstyle.btn_Back}>
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.7071 1.70712L9.29292 0.292908L0.585815 9.00001L9.29292 17.7071L10.7071 16.2929L4.41423 10H19.5V8H4.41426L10.7071 1.70712Z" />
                </svg>
              </div>
              Friends
        </h1>
      </div>
      <div className={style.container_friendscontent}>
        <h2 className={style.friends_title}>Invite your friends and we’ll let you know when there’s something to watch together!</h2>
        <PendingInvite /> 
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
            <input className={style.input_invite} type="text" placeholder="Enter friend's email..." />
            <div className={`${sharedstyle.btn} ${sharedstyle.btnInvite}`}>Invite</div>
          </div>
          <p className={style.error}>This person is already on your friend's list.</p>
          {/* TODO: Toggle Message visibility. class="success" will appear when a message goes though */}
        </div>
      </div>
    </div>
  );
}
