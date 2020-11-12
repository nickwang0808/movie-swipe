import React from "react";
import handleWatched from "../../../db-operations/handleWatched";
import { IUserInfo } from "../../../db-operations/useGetAllMatches";
import style from "../notification.module.css";
import sharedstyle from "../../ButtonComps/ButtonComps.module.css";

interface IWatchedWithWho {
  uid: string;
  movieId: number;
  matches: IUserInfo[] | undefined;
}

export default function WatchedWithWho({
  matches,
  movieId,
  uid,
}: IWatchedWithWho) {
  return (
    <>
      <h1>Who did you watch with?</h1>
      <div className={style.container_modalcontent}>
        {/* <ion-item>
              <ion-label>Jon Snow</ion-label>
              <ion-checkbox color="primary" checked slot="start"></ion-checkbox>
            </ion-item>
        <ion-item>
            <ion-label>Jon Snow</ion-label>
            <ion-checkbox color="primary" checked slot="start"></ion-checkbox>
        </ion-item> */}
        <div className={`${sharedstyle.btn} ${sharedstyle.btn_outline}`} onClick={() =>
            handleWatched(uid, movieId, matches?.map((e) => e.uid) as string[])}>Save</div>
      </div>
    </>
  );
}
