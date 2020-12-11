import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import MainHeader from "../../comp/Layout/MainHeader";
import WatchListItem from "../../comp/ListItem/WatchListItem";
import WatchListEmpty from "../../comp/Misc/WatchListEmpty";
import TopTab from "../../comp/NavBar/TopTab";

const dummy = {
  matched: false,
  watched: false,
  movie: {
    title: "Once Upon a Snowman",
    id: 213123,
    poster_path: "/qzA87Wf4jo1h8JMk9GilyIYvwsA.jpg",
  },
};

export default function WatchList() {
  return (
    <IonPage>
      <MainHeader title="My Watch List" disableBackButton />
      <IonContent>
        <TopTab />
        <WatchListEmpty type="like" />
        <WatchListItem {...dummy} />
        <WatchListItem {...dummy} />
        <WatchListItem {...dummy} />
        <WatchListItem {...dummy} />
        <WatchListItem {...dummy} />
        <WatchListItem {...dummy} />
      </IonContent>
    </IonPage>
  );
}
