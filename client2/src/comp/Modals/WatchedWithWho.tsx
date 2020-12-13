import { IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import React, { useState } from "react";
import styled from "styled-components";
import { Btn } from "../../theme/BaseComp";

interface IWatchedWithWho {
  movieId: number;
  matches: IUserInfo[];
}

interface IUserInfo {
  uid: string;
  name: string;
}

export default function WatchedWithWho({ matches, movieId }: IWatchedWithWho) {
  const [selectedMatches, setSelectedMatches] = useState<string[]>([]);

  return (
    <>
      <h1>Watched with whom?</h1>
      <div>
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
        <StyledSaveButton
        // onClick={() => handleWatched(uid, movieId, selectedMatches)}
        >
          Save
        </StyledSaveButton>
      </div>
    </>
  );
}

const StyledSaveButton = styled(Btn)`
  &:active {
    border-color: var(--highlight);
    color: var(--highlight);
  }
`;
