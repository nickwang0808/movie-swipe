import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import { IAppState } from "../../store";

interface IProps {
  setView: (arg: "liked" | "watched") => void;
  view: "liked" | "watched";
}

export default function SegmentBar({ setView, view }: IProps) {
  const { Watched, Liked } = useSelector((state: IAppState) => state.voted);

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
          <IonLabel>{`My Movies (${Liked && Liked.length})`}</IonLabel>
        </StyledSegButton>
        <StyledSegButton value="watched">
          <IonLabel>{`Watched (${Watched && Watched.length})`}</IonLabel>
        </StyledSegButton>
      </StyledSegment>
    </>
  );
}

const StyledSegment = styled(IonSegment)`
  border-radius: 3px;
  border: 1px solid black;
  --background: none;
  height: 5rem;
  margin: 1rem 1rem 0;
  width: unset;
`;

const StyledSegButton = styled(IonSegmentButton)`
  --ion-background-color: var(--highlight);
  --color-checked: white;
  --border-radius: 3px;

  & ion-label {
    font-size: 1.8rem;
    font-weight: 600;
  }
`;
