import {
  IonApp,
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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import "./App.css";
import BottomNavIcon1 from "./Assets/svg/BottomaNavIcon1.svg";
import BottomNavIcon2 from "./Assets/svg/BottomaNavIcon2.svg";
import BottomNavIcon3 from "./Assets/svg/BottomaNavIcon3.svg";
import Badge from "./comp/Misc/Badge";
import FilterMenu from "./comp/Misc/FilterMenu/FilterMenu";
import { CenterLoader } from "./comp/Misc/LoadingSpinner";
import { auth } from "./firebase/config";
import useAllListener from "./firebase/FirestoreListeners/useAllListener";
import useNotificationListener from "./firebase/FirestoreListeners/useNotificationListener";
import useAnimateDeck from "./Helper/useAnimateDeck";
import useGetWIndowsSizing from "./Helper/useGetWIndowsSizing";
import { IVotedMovies, IVotedMTvs } from "./MovieTypes";
import { IExtendedMovieDetails } from "./MovieTypes/ExtendedMovieDetails";
import { setModalToShow } from "./redux/DetailsScreenState/DetailsScreenReducer";
import fetchMovie from "./redux/MovieList/fetchMovieThunk";
import { populateMovieDetailsThunk } from "./redux/MovieList/populateMovieDetailsThunk";
import SignInScreen from "./Screens/Auth/SignInScreen";
import MainScreen from "./Screens/MainScreen/MainScreen";
import MovieDetailsScreen from "./Screens/MovieDetailsScreen/MovieDetailsScreen";
import TrailerModalScreen from "./Screens/MovieDetailsScreen/TrailerModalScreen";
import AboutUs from "./Screens/Profile/AboutUsScreen";
import DislikedList from "./Screens/Profile/DislikedList";
import FriendsScreen from "./Screens/Profile/FriendsScreen";
import ProfileMainScreen from "./Screens/Profile/ProfileMainScreen";
import WatchList from "./Screens/WatchList/WatchList";
import { IAppState } from "./store";

const App: React.FC = () => {
  useGetWIndowsSizing();
  useAllListener();
  useNotificationListener();
  const dispatch = useDispatch();
  const { Liked, movieList, status, inviteCount, movieToShow } = useAppHelper(); // all logics are here

  const animationControlObj = useAnimateDeck();

  const handleVote = (isLike: boolean, movie = movieList[0]) => {
    if ("videos" in movieList[0]) {
      animationControlObj.VoteWithAnimation(
        isLike,
        movie as IExtendedMovieDetails
      );
    }
  };

  if (status === "failed")
    return <h2>Something Wrong happened, refresh or restart the App</h2>;
  if (movieList.length === 0 && (status === "loading" || status === "idle"))
    return <CenterLoader />;
  return (
    <IonApp>
      <IonModal
        isOpen={Boolean(movieToShow)}
        onDidDismiss={() => dispatch(setModalToShow(null))}
      >
        <MovieDetailsScreen handleVote={handleVote} />
      </IonModal>

      {"videos" in movieList[0] && <TrailerModalScreen />}

      <IonReactRouter>
        {movieList && <FilterMenu />} {/* side menu */}
        <IonTabs>
          <IonTabBar slot="bottom">
            <IonTabButton tab="Watch_List" href="/mylist">
              <IonIcon src={BottomNavIcon1} size="large" />

              <IonLabel>Watch List</IonLabel>
              <Badge
                counter={
                  (Liked as Array<IVotedMovies | IVotedMTvs>).filter(
                    (elem) => elem.notify === true
                  ).length
                }
              />
            </IonTabButton>

            <IonTabButton tab="discovery" href="/home">
              <IonIcon src={BottomNavIcon2} size="large" />
              <IonLabel>Discovery</IonLabel>
            </IonTabButton>

            <IonTabButton tab="profile" href="/profile">
              <IonIcon src={BottomNavIcon3} size="large" />
              <IonLabel>Profile</IonLabel>
              <Badge counter={inviteCount} />
            </IonTabButton>
          </IonTabBar>
          <IonRouterOutlet id="main">
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route
              path="/home"
              render={() => (
                <IonPage>
                  <MainScreen
                    animationControls={animationControlObj}
                    handleVote={handleVote}
                  />
                </IonPage>
              )}
            />
            <Route
              exact
              path="/mylist"
              render={() => (
                <IonPage>
                  <WatchList />
                </IonPage>
              )}
            />

            <Route exact path="/profile" render={() => <ProfileMainScreen />} />
            <Route
              exact
              path="/profile/friend"
              render={() => <FriendsScreen />}
            />
            <Route exact path="/profile/about" render={() => <AboutUs />} />
            <Route
              exact
              path="/profile/disliked"
              render={() => <DislikedList />}
            />
            <Route
              exact
              path="/profile/login"
              render={() =>
                auth.currentUser?.isAnonymous ? (
                  <SignInScreen />
                ) : (
                  <Redirect to="/profile" />
                )
              }
            />
          </IonRouterOutlet>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

function useAppHelper() {
  const dispatch = useDispatch();
  const { movieList, status } = useSelector(
    (state: IAppState) => state.movieList
  );
  const { DisLiked, Liked, Watched } = useSelector(
    (state: IAppState) => state.voted
  );
  const inviteCount = useSelector(
    (state: IAppState) => state.friends.received?.length
  );
  const mediaListTypePref = useSelector(
    (state: IAppState) => state.profile.profile?.mediaListTypePref
  );

  const { movieToShow } = useSelector((state: IAppState) => state.detailsState);

  useEffect(() => {
    if (movieList.length < 5 && DisLiked && Liked && Watched) {
      dispatch(fetchMovie());
    }
    if (movieList.length > 0) {
      if ("videos" in movieList[0] === false && mediaListTypePref) {
        dispatch(populateMovieDetailsThunk());
      }
    }
  }, [movieList, DisLiked, Liked, Watched, dispatch]);

  return {
    Liked,
    movieList,
    status,
    inviteCount,
    movieToShow,
    dispatch,
  };
}
