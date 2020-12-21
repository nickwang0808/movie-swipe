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
import {
  objectifyFilterSelection,
  StringifyFilterSelection,
} from "../../../Helper/StringifyFilterSelection";
import { genreList } from "../../../Helper/variables";
import {
  IMediaPref,
  movieListTypesObj,
  SelectMovies,
  SelectTvs,
  tvListTypesObj,
} from "../../../redux/Profile/profileReducer";
import { IAppState } from "../../../store";
import GenreSelection from "./genreSection";
import MovieListSelection from "./MovieListSelection";

export default function FilterMenu() {
  const [checked, setChecked] = useState<number[]>(
    genreList.movie.map((elem) => elem.id)
  );

  const movieListTypePref = useSelector(
    (state: IAppState) => state.profile.profile?.mediaListTypePref
  ) as IMediaPref;
  const [mediaType, setMediaType] = useState<IMediaPref>(
    movieListTypePref || undefined
  );

  return (
    <IonMenu
      swipeGesture={false}
      contentId="main"
      side="end"
      onIonWillClose={() => updatePreferences(checked, mediaType)}
    >
      <IonHeader mode="md">
        <IonToolbar color="light">
          <IonTitle>Refine Suggestions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Media List</IonLabel>
          </IonListHeader>

          <IonRadioGroup
            value={StringifyFilterSelection(mediaType)}
            onIonChange={(e) =>
              setMediaType(objectifyFilterSelection(e.detail.value))
            }
          >
            <IonListHeader>
              <IonLabel>Movies</IonLabel>
            </IonListHeader>
            {movieListTypesObj.map((movieList) => {
              return (
                <MovieListSelection
                  key={movieList.value + "movie"}
                  name={movieList.name}
                  value={StringifyFilterSelection({
                    media: "movie",
                    catagories: movieList.value,
                  } as SelectMovies)}
                />
              );
            })}

            <IonListHeader>
              <IonLabel>Tv Shows</IonLabel>
            </IonListHeader>
            {tvListTypesObj.map((tvList) => {
              return (
                <MovieListSelection
                  key={tvList.value + "tv"}
                  name={tvList.name}
                  value={StringifyFilterSelection({
                    media: "tv",
                    catagories: tvList.value,
                  } as SelectTvs)}
                />
              );
            })}
          </IonRadioGroup>

          <IonListHeader>
            <IonLabel>Catagories</IonLabel>
          </IonListHeader>
          {genreList.movie.map((genre, i) => {
            return (
              <GenreSelection
                key={genre.id + i}
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
