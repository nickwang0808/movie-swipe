import React from "react";
import style from "./MyProfile.module.css";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import ListViewButton from "../ButtonComps/ListViewButton";


export default function MyWatchGroup() {
  return (
    <div>
      <div className={style.container_header}>
        <h1>
            <div className={sharedstyle.btn_Back}>
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.7071 1.70712L9.29292 0.292908L0.585815 9.00001L9.29292 17.7071L10.7071 16.2929L4.41423 10H19.5V8H4.41426L10.7071 1.70712Z" />
                </svg>
              </div>
              My Watch Group
        </h1>
      </div>
      <div className={style.container_mywatchgroup}>
        <div className={style.title}>
              <h2>Members</h2>
        </div>
        <ListViewButton name="TWernisch@gmail.com (you)" />
        <ListViewButton name="Zangmann@Gmail.com" />
        <ListViewButton name="Studio@No-Tec.com" />
      </div>
      <div className={style.title}>
        <h2>Invite Code</h2>
      </div>
      <div className={style.container_invitecode}>
        <div className={style.invite_code}>FCf9</div>
        <div className={sharedstyle.btn}>Copy</div>
      </div>
      <div className={style.helper_text}>
        <p>Share this code with friends to join your Watch Group. You can have up to 10 friends in your group.</p>
      </div>
  </div>
  );
}
