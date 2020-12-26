import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import MainHeader from "../../comp/Layout/MainHeader";
import SmallWatchListItem from "../../comp/ListItem/SmallWatchListItem";
import { IVotedMovies, IVotedMTvs } from "../../MovieTypes";
import { IAppState } from "../../store";

export default function DislikedList() {
  const { DisLiked } = useSelector((state: IAppState) => state.voted);

  if (!DisLiked) return null;
  return (
    <IonPage>
      <MainHeader title="DisLiked Movies" />
      <IonContent>
        {(DisLiked as Array<IVotedMovies | IVotedMTvs>).map((movie) => {
          return <SmallWatchListItem movie={movie} key={movie.id} />;
        })}
      </IonContent>
    </IonPage>
  );
}
