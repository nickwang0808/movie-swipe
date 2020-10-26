import React from "react";
import style from "./MainPoster.module.css";

export default function NotificationMatched() {
  return (
    <div className={style.container_matched}>
          <div className={style.matched_poster}></div>
          <div className={style.matched_details}>
            <div className={style.matched_banner}><div className={style.forceSkew}>MATCH!</div></div>
            <div className={style.matched_text}><p>Francesca wants to watch Enola Holms too!</p></div>
            <div className={style.matched_getdetailsbtn}><a href="#">Details</a></div>
          </div>
    </div>
  );
}
