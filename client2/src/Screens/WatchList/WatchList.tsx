import { IonContent } from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import MainHeader from "../../comp/Layout/MainHeader";
import WatchListItem from "../../comp/ListItem/WatchListItem";
import WatchListEmpty from "../../comp/Misc/WatchListEmpty";
import TopTab from "../../comp/NavBar/TopTab";
import sortByLikedAndMatched from "../../Helper/sortByLikedAndMatched";
import { IAppState } from "../../store";

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
  const { Liked, Watched } = useSelector((state: IAppState) => state.voted);

  return (
    <>
      <MainHeader title="My Watch List" disableBackButton />
      <IonContent>
        <TopTab />
        <Route path="/mylist/liked">
          {Liked && Liked.length > 0 ? (
            Liked.slice()
              .sort(sortByLikedAndMatched)
              .map((movie) => (
                <WatchListItem
                  key={movie.id}
                  movie={movie}
                  matched={movie.matchedWith || []}
                  notify={movie.notify}
                />
              ))
          ) : (
            <WatchListEmpty type="like" />
          )}
        </Route>
        <Route
          exact
          path="/mylist"
          render={() => <Redirect to="/mylist/liked" />}
        />
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
