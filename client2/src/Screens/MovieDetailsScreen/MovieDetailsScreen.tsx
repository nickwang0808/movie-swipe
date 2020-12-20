import { IonFooter, IonPopover } from "@ionic/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import VoteButtonGroupV2 from "../../comp/ButtonGroups/VoteButtonGroupV2";
import { CenterLoader } from "../../comp/Misc/LoadingSpinner";
import WatchedWithWho from "../../comp/Modals/WatchedWithWho";
import MatchedWatchedWithBanner from "../../comp/MovieDetailsComp/MatchWatchBanner/MatchedWatchedWithBanner";
import Providers from "../../comp/MovieDetailsComp/Providers";
import TitleBox from "../../comp/MovieDetailsComp/TitleBox";
import Trailer from "../../comp/MovieDetailsComp/Trailer";
import watchedMovie from "../../firebase/firestoreOperations/watchedMovie";
import { IMovieDetailsForDetailsExtended } from "../../MovieTypes/IDetialsScreen";
import { setModalToShow } from "../../redux/DetailsScreenState/DetailsScreenReducer";
import { IProfileDetails } from "../../redux/Profile/profileReducer";
import { IAppState, store } from "../../store";
import { IonContentWithBG } from "../MainScreen/MainScreen";

const MovieDetailsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { movieToShow, loading, movieInfo } = useSelector(
    (state: IAppState) => state.detailsState
  );

  // pull data from movie list first, if no data then pull from refetched list
  let newMovieInfo;
  if (movieToShow === store.getState().movieList.movieList[0].id) {
    newMovieInfo = store.getState().movieList
      .movieList[0] as IMovieDetailsForDetailsExtended;
  } else {
    newMovieInfo = movieInfo;
  }

  const liked = useSelector((state: IAppState) =>
    state.voted.Liked?.find((elem) => elem.id === movieToShow)
  );
  const watched = useSelector((state: IAppState) =>
    state.voted.Watched?.find((elem) => elem.id === movieToShow)
  );

  const [popOver, setPopOver] = useState(false);

  const handleWatched = (matchedWithIds: string[]) =>
    watchedMovie(matchedWithIds, movieToShow as number);

  const closeDetailsModal = () => dispatch(setModalToShow(null));

  let matchOrWatched;
  if ((liked && liked.matchedWith.length > 0) || watched) {
    matchOrWatched = (
      <MatchedWatchedWithBanner
        openPopOver={() => setPopOver(true)}
        matches={liked?.matchedWith}
        watchedWith={watched?.watchedWith}
        movieId={movieToShow as number}
        handleWatched={handleWatched}
      />
    );
  }

  if (loading || !newMovieInfo) return <CenterLoader />;
  return (
    <>
      <BGContentWithFadeMask fullscreen bg={newMovieInfo.poster_path}>
        <IonPopover isOpen={popOver} onDidDismiss={() => setPopOver(false)}>
          <WatchedWithWho
            handleWatched={handleWatched}
            closePopUp={() => setPopOver(false)}
            matches={liked?.matchedWith as IProfileDetails[]}
          />
        </IonPopover>

        <Trailer
          trailerUrl={newMovieInfo.videos.results[0]?.key}
          backDrop={newMovieInfo.backdrop_path}
        />
        <TitleBox movieInfo={newMovieInfo} onClick={closeDetailsModal} />
        <div className="ion-padding-horizontal ion-padding-bottom">
          {matchOrWatched}
          <p>{newMovieInfo.overview}</p>
        </div>
        <Providers providers={["test"]} />
      </BGContentWithFadeMask>

      <IonFooter className="ion-margin-top">
        <VoteButtonGroupV2
          handleLike={() => console.log("like")}
          handleDislike={() => console.log("dislike")}
          handleDetails={closeDetailsModal}
          handleTrailer={() => {}}
        />
        <div className="ion-margin-vertical" />
      </IonFooter>
    </>
  );
};

export default MovieDetailsScreen;

const BGContentWithFadeMask = styled(IonContentWithBG)`
  &::part(scroll) {
    mask-image: linear-gradient(0deg, transparent 60px, black 100px);
  }
`;
