import {
  IonContent,
  IonHeader,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import updatePreferences from "../../../firebase/firestoreOperations/updatePreferences";
import { genreList } from "../../../Helper/variables";
import {
  movieListTypes,
  movieListTypesObj,
} from "../../../redux/Profile/profileReducer";
import { IAppState } from "../../../store";
import GenreSelection from "./genreSection";
import MovieListSelection from "./MovieListSelection";

export default function FilterMenu() {
  const [checked, setChecked] = useState<number[]>(
    genreList.movie.map((elem) => elem.id)
  );

  const movieListTypePref = useSelector(
    (state: IAppState) => state.profile.profile?.movieListTypePref
  ) as movieListTypes;
  const [listType, setListType] = useState<movieListTypes>(
    movieListTypePref || undefined
  );

  return (
    <IonMenu
      swipeGesture={false}
      contentId="main"
      side="end"
      onIonWillClose={() => updatePreferences(checked, listType)}
    >
      <IonHeader mode="md">
        <IonToolbar color="light">
          <IonTitle>Refine Suggestions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Movie List</IonLabel>
          </IonListHeader>

          <IonRadioGroup
            value={listType}
            onIonChange={(e) => setListType(e.detail.value)}
          >
            {movieListTypesObj.map((list) => {
              return (
                <MovieListSelection
                  key={list.value}
                  name={list.name}
                  value={list.value as movieListTypes}
                />
              );
            })}
          </IonRadioGroup>

          <IonListHeader>
            <IonLabel>Catagories</IonLabel>
          </IonListHeader>
          {genreList.movie.map((genre) => {
            return (
              <GenreSelection
                key={genre.id}
                id={genre.id}
                name={genre.name}
                setChecked={setChecked}
                isChecked={
                  checked.find((elem) => elem === genre.id) ? true : false
                }
              />
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}
