import { IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import React from "react";

interface ICheckboxButton {
  name: string;
  isChecked: boolean;
  setChecked: (arg: (arg: number[]) => number[]) => void;
  id: number;
}

export default function GenreSelection({
  name,
  setChecked,
  isChecked,
  id,
}: ICheckboxButton) {
  return (
    <IonItem>
      <IonCheckbox
        slot="start"
        color="dark"
        mode="md"
        checked={isChecked}
        onIonChange={() => {
          isChecked
            ? setChecked((prev) => prev.filter((elem) => elem !== id))
            : setChecked((prev) => [...prev, id]);
        }}
      />
      <IonLabel>{name}</IonLabel>
    </IonItem>
  );
}
