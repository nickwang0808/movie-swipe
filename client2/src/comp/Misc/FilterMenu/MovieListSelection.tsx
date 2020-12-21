import { IonItem, IonLabel, IonRadio } from "@ionic/react";
import React from "react";

interface IProps {
  name: string;
  value: string;
}

export default function MovieListSelection({ name, value }: IProps) {
  return (
    <IonItem>
      <IonRadio slot="start" color="dark" mode="md" value={value} />
      <IonLabel>{name}</IonLabel>
    </IonItem>
  );
}
