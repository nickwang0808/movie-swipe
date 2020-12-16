import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

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
        <IonToolbar color="header" mode="md">
          {!disableBackButton && (
            <IonButtons slot="start">
              <IonBackButton color="light" defaultHref="/" />
            </IonButtons>
          )}
          <IonTitle color="light">{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  );
}
