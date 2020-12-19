import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React from "react";
import styled from "styled-components/macro";

interface IProps {
  setView: (arg: "liked" | "watched") => void;
  view: "liked" | "watched";
}

export default function SegmentBar({ setView, view }: IProps) {
  return (
    <>
      <StyledSegment
        mode="ios"
        value={view}
        onIonChange={(e) => {
          console.log(e.detail.value);
          setView(e.detail.value as "liked" | "watched");
        }}
      >
        <StyledSegButton value="liked">
          <IonLabel>My Movies</IonLabel>
        </StyledSegButton>
        <StyledSegButton value="watched">
          <IonLabel>Watched</IonLabel>
        </StyledSegButton>
      </StyledSegment>
    </>
  );
}

const StyledSegment = styled(IonSegment)`
  border-radius: 3rem;
  border: 1px solid black;
  --background: none;
  height: 5rem;
  margin: 2rem 2rem 0;
  width: unset;
  position: sticky;
`;

const StyledSegButton = styled(IonSegmentButton)`
  --ion-background-color: var(--highlight);
  --color-checked: white;
  --border-radius: 3rem;

  & ion-label {
    font-size: 1.8rem;
    font-weight: 600;
  }
`;
