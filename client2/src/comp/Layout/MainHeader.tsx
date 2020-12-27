import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import styled from "styled-components";

interface IProps {
  title: string;
  disableBackButton?: boolean;
}

export default function MainHeader({
  title,
  disableBackButton = false,
}: IProps) {
  return (
    <>
      <IonHeader>
        <StyledToolBar color="header" mode="md">
          {!disableBackButton && (
            <IonButtons slot="start">
              <IonBackButton color="light" defaultHref="/" />
            </IonButtons>
          )}
          <IonTitle color="light">{title}</IonTitle>
        </StyledToolBar>
      </IonHeader>
    </>
  );
}

const StyledToolBar = styled(IonToolbar)`
  --ion-color-header: linear-gradient(
    266.71deg,
    #29323c 11.43%,
    #485563 89.74%
  );
  --ion-color-base: var(--ion-color-header);

  & ion-title {
    font-weight: 600;
  }
`;
