import { IonPopover } from "@ionic/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import VoteButtonGroup from "../../comp/ButtonGroups/VoteButtonGroup";
import MainBackground from "../../comp/Layout/MainBackground";
import { CenterLoader } from "../../comp/Misc/LoadingSpinner";
import WatchedWithWho from "../../comp/Modals/WatchedWithWho";
import MatchedWatchedWithBanner from "../../comp/MovieDetailsComp/MatchWatchBanner/MatchedWatchedWithBanner";
import TitleBox from "../../comp/MovieDetailsComp/TitleBox";
import Trailer from "../../comp/MovieDetailsComp/Trailer";
import watchedMovie from "../../firebase/firestoreOperations/watchedMovie";
import { IMovieDetailsForDetailsExtended } from "../../MovieTypes/IDetialsScreen";
import { setModalToShow } from "../../redux/DetailsScreenState/DetailsScreenReducer";
import { IProfileDetails } from "../../redux/Profile/profileReducer";
import { IAppState, store } from "../../store";

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
      <IonPopover isOpen={popOver} onDidDismiss={() => setPopOver(false)}>
        <WatchedWithWho
          handleWatched={handleWatched}
          closePopUp={() => setPopOver(false)}
          matches={liked?.matchedWith as IProfileDetails[]}
        />
      </IonPopover>

      <MainBackground ImgUrl={newMovieInfo.poster_path} />
      <MakeTitleBgTransparent>
        <Trailer
          trailerUrl={newMovieInfo.videos.results[0]?.key}
          backDrop={newMovieInfo.backdrop_path}
        />
        <TitleBox movieInfo={newMovieInfo} onClick={closeDetailsModal} />
        <Content>
          {matchOrWatched}
          <p>{newMovieInfo.overview}</p>
        </Content>
      </MakeTitleBgTransparent>
      <VoteButtonGroup
        MiddleButtonText="Back"
        handleLike={() => console.log("like")}
        handleDislike={() => console.log("dislike")}
        handleClickMiddleButton={closeDetailsModal}
      />
    </>
  );
};

export default MovieDetailsScreen;

const MakeTitleBgTransparent = styled.div`
  padding-bottom: calc(var(--nav) + 7rem);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;

  mask-image: linear-gradient(to top, transparent 110px, black 140px);
`;

const Content = styled.div`
  padding: 0 2rem calc(var(--nav) + 7rem) 2rem;
`;
