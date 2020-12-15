import { IonApp, IonContent, IonPage, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import "./App.css";
import { CenterLoader } from "./comp/Misc/LoadingSpinner";
import BottomNav from "./comp/NavBar/BottomNav";
import useFriendsListener from "./firebase/FirestoreListeners/useFriendsListener";
import useProfileListener from "./firebase/FirestoreListeners/useProfileListener";
import useVotedMovieListener from "./firebase/FirestoreListeners/useVotedListener";
import useGetWIndowsSizing from "./Helper/useGetWIndowsSizing";
import fetchMovie from "./redux/MovieList/fetchMovieThunk";
import { populateMovieDetailsThunk } from "./redux/MovieList/populateMovieDetailsThunk";
import MainScreen from "./Screens/MainScreen/MainScreen";
import MovieDetailsScreen from "./Screens/MovieDetailsScreen/MovieDetailsScreen";
import FriendsScreen from "./Screens/Profile/FriendsScreen";
import ProfileMainScreen from "./Screens/Profile/ProfileMainScreen";
import WatchList from "./Screens/WatchList/WatchList";
import { IAppState } from "./store";

const App: React.FC = () => {
  useGetWIndowsSizing();
  useProfileListener();
  useVotedMovieListener();
  useFriendsListener();

  const dispatch = useDispatch();
  const { movieList, status } = useSelector(
    (state: IAppState) => state.movieList
  );
  const { DisLiked, Liked, Watched } = useSelector(
    (state: IAppState) => state.voted
  );
  useEffect(() => {
    if (movieList.length < 5 && DisLiked && Liked && Watched) {
      dispatch(fetchMovie());
    }
  }, [movieList, DisLiked, Liked, Watched]);

  useEffect(() => {
    if (movieList.length > 0) {
      if ("release_dates" in movieList[0] === false) {
        dispatch(populateMovieDetailsThunk());
      }
    }
  }, [movieList]);

  if (status === "failed")
    return <h2>Something Wrong happened, refresh or restart the App</h2>;
  if (movieList.length === 0 && (status === "loading" || status === "idle"))
    return <CenterLoader />;
  return (
    <IonApp>
      <IonReactRouter>
        <BottomNav profileBadgeCounter={0} watchListBadgeCounter={0} />
        <IonRouterOutlet>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home">
            <IonPage>
              <IonContent>
                <MainScreen />
              </IonContent>
            </IonPage>
          </Route>
          <Route exact path="/mylist">
            <IonPage>
              <WatchList />
            </IonPage>
          </Route>
          <Route exact path="/profile">
            <ProfileMainScreen />
          </Route>
          <Route exact path="/profile/friend">
            <FriendsScreen />
          </Route>
          <Route
            path="/details/:id"
            render={(props) => (
              <IonPage>
                <IonContent>
                  <MovieDetailsScreen {...props} />
                </IonContent>
              </IonPage>
            )}
          ></Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
