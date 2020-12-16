import { IonContent } from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import MainHeader from "../../comp/Layout/MainHeader";
import WatchListItem from "../../comp/ListItem/WatchListItem";
import WatchListEmpty from "../../comp/Misc/WatchListEmpty";
import TopTab from "../../comp/NavBar/TopTab";
import sortByLikedAndMatched from "../../Helper/sortByLikedAndMatched";
import { IAppState } from "../../store";

interface IProps {
  setShowDetailModal: (arg: number) => void;
}

export default function WatchList({ setShowDetailModal }: IProps) {
  const { Liked, Watched } = useSelector((state: IAppState) => state.voted);

  return (
    <>
      <MainHeader title="My Watch List" disableBackButton />
      <IonContent>
        <TopTab />
        {Liked && Liked.length > 0 ? (
          Liked.slice()
            .sort(sortByLikedAndMatched)
            .map((movie) => (
              <WatchListItem
                onClick={() => setShowDetailModal(movie.id)}
                key={movie.id}
                movie={movie}
                matched={movie.matchedWith || []}
                notify={movie.notify}
              />
            ))
        ) : (
          <WatchListEmpty type="like" />
        )}
        {/* <Route exact path="/mylist/Watched">
          {Watched && Watched.length > 0 ? (
            Watched.map((movie) => <WatchListItem movie={movie} />)
          ) : (
            <WatchListEmpty type="watch" />
          )}
        </Route> */}
      </IonContent>
    </>
  );
}
