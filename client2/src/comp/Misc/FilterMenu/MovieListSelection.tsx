import { IonItem, IonLabel, IonRadio } from "@ionic/react";
import React from "react";
import { movieListTypes } from "../../../redux/Profile/profileReducer";

interface IMovieListSelection {
  name: string;
  value: movieListTypes;
}

export default function MovieListSelection({
  name,
  value,
}: IMovieListSelection) {
  return (
    <IonItem>
      <IonRadio slot="start" color="dark" mode="md" value={value} />
      <IonLabel>{name}</IonLabel>
    </IonItem>
  );
}
