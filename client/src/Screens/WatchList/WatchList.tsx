import { IonContent } from "@ionic/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainHeader from "../../comp/Layout/MainHeader";
import SmallWatchListItem from "../../comp/ListItem/SmallWatchListItem";
import WatchListItem from "../../comp/ListItem/WatchListItem";
import WatchListEmpty from "../../comp/Misc/WatchListEmpty";
import SegmentBar from "../../comp/NavBar/SegmentBar";
import removeNotification from "../../firebase/firestoreOperations/removeNotification";
import sortByLikedAndMatched from "../../Helper/sortByLikedAndMatched";
import { IWatchedMovies, IWatchedTvs } from "../../MovieTypes";
import { setModalToShow } from "../../redux/DetailsScreenState/DetailsScreenReducer";
import { IAppState } from "../../store";

export default function WatchList() {
  const dispatch = useDispatch();
  const { Liked, Watched } = useSelector((state: IAppState) => state.voted);
  const [view, setView] = useState<"liked" | "watched">("liked");

  const likedView =
    Liked && Liked.length > 0 ? (
      Liked.slice()
        .sort(sortByLikedAndMatched)
        .map((movie) => (
          <WatchListItem
            onClick={() => {
              dispatch(setModalToShow(movie.id));
              removeNotification(movie.id);
            }}
            key={movie.id}
            movie={movie}
            matched={movie.matchedWith || []}
          />
        ))
    ) : (
      <WatchListEmpty type="like" />
    );

  const watchedView =
    Watched && Watched.length > 0 ? (
      (Watched as (IWatchedMovies | IWatchedTvs)[]).map((movie) => (
        <SmallWatchListItem movie={movie} />
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
