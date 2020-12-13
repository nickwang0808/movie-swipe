import { IonContent } from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import MainHeader from "../../comp/Layout/MainHeader";
import WatchListItem from "../../comp/ListItem/WatchListItem";
import WatchListEmpty from "../../comp/Misc/WatchListEmpty";
import TopTab from "../../comp/NavBar/TopTab";
import { Result } from "../../MovieTypes/IPopularMovies";
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
  const LikedMovies: Result[] = useSelector(
    (state: IAppState) => state.firestore.ordered.LikedMovies
  );
  const WatchedMovies: Result[] = useSelector(
    (state: IAppState) => state.firestore.ordered.WatchedMovies
  );

  return (
    <>
      <MainHeader title="My Watch List" disableBackButton />
      <IonContent>
        <TopTab />
        <Route path="/mylist/liked">
          {LikedMovies && LikedMovies.length > 0 ? (
            LikedMovies.map((movie) => (
              <WatchListItem key={movie.id} movie={movie} />
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
        <Route exact path="/mylist/Watched">
          {WatchedMovies && WatchedMovies.length > 0 ? (
            WatchedMovies.map((movie) => <WatchListItem movie={movie} />)
          ) : (
            <WatchListEmpty type="watch" />
          )}
        </Route>
      </IonContent>
    </>
  );
}
