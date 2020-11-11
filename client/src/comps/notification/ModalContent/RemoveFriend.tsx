import React from "react";
import style from "../notification.module.css";
import sharedstyle from "../../ButtonComps/ButtonComps.module.css";

export default function RemoveFriend() {
  return (
    <>
      <h1 className={style.title}>Remove friend?</h1>
      <p className={style.body}>
        Are you sure you want to remove TWernisch@gmail.com from your friends
        list?
      </p>
      <div className={style.container_actions}>
        <div className={`${sharedstyle.btn} ${sharedstyle.secondary}`}>
          Cancel
        </div>
        <div className={`${sharedstyle.btn} ${style.primary}`}>Yes, do it!</div>
      </div>
    </>
  );
}
