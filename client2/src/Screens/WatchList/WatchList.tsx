import { IonContent } from "@ionic/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MainHeader from "../../comp/Layout/MainHeader";
import WatchListItem from "../../comp/ListItem/WatchListItem";
import WatchListEmpty from "../../comp/Misc/WatchListEmpty";
import SegmentBar from "../../comp/NavBar/SegmentBar";
import removeNotification from "../../firebase/firestoreOperations/removeNotification";
import sortByLikedAndMatched from "../../Helper/sortByLikedAndMatched";
import { IAppState } from "../../store";

interface IProps {
  setShowDetailModal: (arg: number) => void;
}

export default function WatchList({ setShowDetailModal }: IProps) {
  const { Liked, Watched } = useSelector((state: IAppState) => state.voted);
  const [view, setView] = useState<"liked" | "watched">("liked");

  const likedView =
    Liked && Liked.length > 0 ? (
      Liked.slice()
        .sort(sortByLikedAndMatched)
        .map((movie) => (
          <WatchListItem
            onClick={() => {
              setShowDetailModal(movie.id);
              removeNotification(movie.id);
            }}
            key={movie.id}
            movie={movie}
            matched={movie.matchedWith || []}
            notify={movie.notify}
          />
        ))
    ) : (
      <WatchListEmpty type="like" />
    );

  const watchedView =
    Watched && Watched.length > 0 ? (
      Watched.map((movie) => (
        <WatchListItem
          onClick={() => setShowDetailModal(movie.id)}
          key={movie.id}
          movie={movie}
          watched={movie.watchedWith}
          notify={false}
        />
      ))
    ) : (
      <WatchListEmpty type="watch" />
    );

  return (
    <>
      <MainHeader title="My Watch List" disableBackButton />
      <IonContent>
        <SegmentBar setView={setView} view={view} />
        {view === "liked" ? likedView : watchedView}
      </IonContent>
    </>
  );
}
