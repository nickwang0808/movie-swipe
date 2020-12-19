import { IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import React, { useState } from "react";
import styled from "styled-components";
import { IProfileDetails } from "../../redux/Profile/profileReducer";
import { Btn } from "../../theme/BaseComp";

interface IWatchedWithWho {
  matches: IProfileDetails[];
  handleWatched: (arg: string[]) => void;
  closePopUp: () => void;
}

export default function WatchedWithWho({
  matches,
  handleWatched,
  closePopUp,
}: IWatchedWithWho) {
  const [selectedMatches, setSelectedMatches] = useState<string[]>([]);

  return (
    <>
      <h1>Watched with whom?</h1>
      <ContentWrapper>
        {matches.map((match) => (
          <IonItem key={match.uid}>
            <IonLabel>{match.displayName}</IonLabel>
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
          onClick={() => {
            if (selectedMatches.length > 0) {
              handleWatched(selectedMatches);
            }
            closePopUp();
          }}
        >
          Save
        </StyledSaveButton>
      </ContentWrapper>
    </>
  );
}

const StyledSaveButton = styled(Btn)`
  &:active {
    border-color: var(--highlight);
    color: var(--highlight);
  }
`;

const ContentWrapper = styled.div`
  padding: 0 16px 16px 16px;
`;
