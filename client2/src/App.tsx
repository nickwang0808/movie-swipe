import {
  IonApp,
  IonBadge,
  IonContent,
  IonIcon,
  IonLabel,
  IonModal,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import "./App.css";
import BottomNavIcon1 from "./Assets/svg/BottomaNavIcon1.svg";
import BottomNavIcon2 from "./Assets/svg/BottomaNavIcon2.svg";
import BottomNavIcon3 from "./Assets/svg/BottomaNavIcon3.svg";
import { CenterLoader } from "./comp/Misc/LoadingSpinner";
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
  const [showDetailModal, setShowDetailModal] = useState<number>();

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
    if (movieList.length > 0) {
      if ("release_dates" in movieList[0] === false) {
        dispatch(populateMovieDetailsThunk());
      }
    }
  }, [movieList, DisLiked, Liked, Watched, dispatch]);

  if (status === "failed")
    return <h2>Something Wrong happened, refresh or restart the App</h2>;
  if (movieList.length === 0 && (status === "loading" || status === "idle"))
    return <CenterLoader />;
  return (
    <IonApp>
      <IonModal isOpen={Boolean(showDetailModal)}>
        <IonContent>
          <MovieDetailsScreen
            showDetailModal={showDetailModal}
            setShowDetailModal={setShowDetailModal}
          />
        </IonContent>
      </IonModal>
      <IonReactRouter>
        {/* <BottomNav profileBadgeCounter={0} watchListBadgeCounter={0} /> */}
        <IonTabs>
          <IonTabBar slot="bottom">
            <IonTabButton tab="Watch_List" href="/mylist">
              <IonIcon src={BottomNavIcon1} size="large" />

              <IonLabel>Watch List</IonLabel>
              <IonBadge color="warning">6</IonBadge>
            </IonTabButton>

            <IonTabButton tab="discovery" href="/home">
              <IonIcon src={BottomNavIcon2} size="large" />
              <IonLabel>Discovery</IonLabel>
            </IonTabButton>

            <IonTabButton tab="profile" href="/profile">
              <IonIcon src={BottomNavIcon3} size="large" />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
          <IonRouterOutlet>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home">
              <IonPage>
                <IonContent>
                  <MainScreen setShowDetailModal={setShowDetailModal} />
                </IonContent>
              </IonPage>
            </Route>
            <Route exact path="/mylist">
              <IonPage>
                <WatchList setShowDetailModal={setShowDetailModal} />
              </IonPage>
            </Route>
            <Route exact path="/profile">
              <ProfileMainScreen />
            </Route>
            <Route exact path="/profile/friend">
              <FriendsScreen />
            </Route>
          </IonRouterOutlet>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
