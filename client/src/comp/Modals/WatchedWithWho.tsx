import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import React from "react";
import styled from "styled-components";
import { IProfileDetails } from "../../redux/Profile/profileReducer";

interface IWatchedWithWho {
  matches: IProfileDetails[];
  handleWatched: (arg: string[]) => void;
}

export default function WatchedWithWho({
  matches,
  handleWatched,
}: // closePopUp,
IWatchedWithWho) {
  return (
    <StyledIonLabel>
      <IonLabel>Watched with whom?</IonLabel>
      <IonSelect
        value=""
        multiple={true}
        cancelText="Cancel"
        okText="Confirm"
        onIonChange={(e) => {
          const uids = e.detail.value as string[];
          if (uids.length > 0) {
            handleWatched(uids);
          }
        }}
      >
        {matches.map((match) => (
          <IonSelectOption color="secondary" value={match.uid}>
            {match.displayName || match.email || match.uid}
          </IonSelectOption>
        ))}
      </IonSelect>
    </StyledIonLabel>
  );
}

const StyledIonLabel = styled(IonItem)`
  border: 2px solid var(--dark);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0);
  color: #000000;
  cursor: pointer;
  font-weight: 600;
  font-size: 2rem;

  --ripple-color: transparent;
`;
