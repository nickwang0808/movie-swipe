import React from "react";
import style from "./MyProfile.module.css";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";

export default function MyProfile() {
  return (
    <div>
    <div className={style.container_header}>
        <div><svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.7071 1.70712L9.29292 0.292908L0.585815 9.00001L9.29292 17.7071L10.7071 16.2929L4.41423 10H19.5V8H4.41426L10.7071 1.70712Z" fill="#DA0F3F"/>
</svg>

        </div>
        <h1>Watch Groups</h1>
    </div>
    <div className={style.container_watchgroups}>
     <p className={style.watchgroup_title}>Watch Groups let you know when you and your friends want to watch something together!</p>
     <div className={`${sharedstyle.btn} ${sharedstyle.btnNewWatchGroup}`}>Create New Watch Group</div>
     <div className={style.separator_or}>-or-</div>
     <p className={style.watchgroupcode_title}>Enter Watch Group Code</p>
     <div className={style.watch_group_code}>
     <input className={style.watch_group_inputs} type="text" maxLength={1} placeholder="0" />
     <input className={style.watch_group_inputs} type="text" maxLength={1} placeholder="0" />
     <input className={style.watch_group_inputs} type="text" maxLength={1} placeholder="0" />
     <input className={style.watch_group_inputs} type="text" maxLength={1} placeholder="0" />
      </div>
    </div>
  </div>
  );
}
