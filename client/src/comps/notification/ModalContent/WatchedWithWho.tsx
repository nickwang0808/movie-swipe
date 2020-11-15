import React, { useState } from "react";
import handleWatched from "../../../db-operations/handleWatched";
import { IUserInfo } from "../../../db-operations/useGetAllMatches";
import style from "../notification.module.css";
import sharedstyle from "../../ButtonComps/ButtonComps.module.css";
import { IonCheckbox, IonItem, IonLabel } from "@ionic/react";

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
  const [selectedMatches, setSelectedMatches] = useState<string[]>([]);

  return (
    <>
      <h1>Who did you watch with?</h1>
      <div className={style.container_modalcontent}>
        {matches?.map((match) => (
          <IonItem key={match.uid}>
            <IonLabel>{match.name}</IonLabel>
            <IonCheckbox
              color="dark"
              slot="start"
              checked={
                selectedMatches.find((elem) => elem === match.uid)
                  ? true
                  : false
              }
              onIonChange={() => {
                const found = selectedMatches.find(
                  (elem) => elem === match.uid
                );
                if (found) {
                  setSelectedMatches((prev) =>
                    prev.filter((elem) => elem !== match.uid)
                  );
                } else {
                  setSelectedMatches((prev) => [...prev, match.uid]);
                }
              }}
            ></IonCheckbox>
          </IonItem>
        ))}
        <div
          className={`${sharedstyle.btn} ${sharedstyle.btn_outline}`}
          onClick={() => handleWatched(uid, movieId, selectedMatches)}
        >
          Save
        </div>
      </div>
    </>
  );
}
