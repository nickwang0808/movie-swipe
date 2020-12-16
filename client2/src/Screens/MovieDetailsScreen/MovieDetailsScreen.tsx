import { IonPopover } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import VoteButtonGroup from "../../comp/ButtonGroups/VoteButtonGroup";
import MainBackground from "../../comp/Layout/MainBackground";
import { CenterLoader } from "../../comp/Misc/LoadingSpinner";
import WatchedWithWho from "../../comp/Modals/WatchedWithWho";
import MatchedWatchedWithBanner from "../../comp/MovieDetailsComp/MatchWatchBanner/MatchedWatchedWithBanner";
import TitleBox from "../../comp/MovieDetailsComp/TitleBox";
import Trailer from "../../comp/MovieDetailsComp/Trailer";
import watchedMovie from "../../firebase/firestoreOperations/watchedMovie";
import fetchVidActorProvider from "../../Helper/fetchVidActorProvider";
import { IMovieDetailsForDetailsScreen } from "../../MovieTypes/IDetialsScreen";
import { IProfileDetails } from "../../redux/Profile/profileReducer";
import { IAppState } from "../../store";

interface IProps {
  showDetailModal: number | undefined;
  setShowDetailModal: (arg: undefined) => void;
}

const MovieDetailsScreen: React.FC<IProps> = ({
  showDetailModal,
  setShowDetailModal,
}) => {
  const [movieInfo, setMovieInfo] = useState<IMovieDetailsForDetailsScreen>();

  const liked = useSelector((state: IAppState) =>
    state.voted.Liked?.find((elem) => elem.id === showDetailModal)
  );
  const watched = useSelector((state: IAppState) =>
    state.voted.Watched?.find((elem) => elem.id === showDetailModal)
  );

  useEffect(() => {
    if (!movieInfo || showDetailModal !== undefined) {
      // fetch movie details
      (async () => {
        const res = await fetchVidActorProvider(showDetailModal as number);
        setMovieInfo(res);
      })();
    }
  }, [showDetailModal, movieInfo]);
  const [popOver, setPopOver] = useState(false);

  const handleWatched = (matchedWithIds: string[]) =>
    watchedMovie(matchedWithIds, showDetailModal as number);

  let matchOrWatched;
  if ((liked && liked.matchedWith.length > 0) || watched) {
    matchOrWatched = (
      <MatchedWatchedWithBanner
        openPopOver={() => setPopOver(true)}
        matches={liked?.matchedWith}
        watchedWith={watched?.watchedWith}
        movieId={showDetailModal as number}
        handleWatched={handleWatched}
      />
    );
  }

  if (!movieInfo || "release_dates" in movieInfo === false)
    return <CenterLoader />;
  return (
    <>
      <IonPopover isOpen={popOver} onDidDismiss={() => setPopOver(false)}>
        <WatchedWithWho
          handleWatched={handleWatched}
          closePopUp={() => setPopOver(false)}
          matches={liked?.matchedWith as IProfileDetails[]}
        />
      </IonPopover>

      <MainBackground ImgUrl={movieInfo.poster_path} />
      <MakeTitleBgTransparent>
        <Trailer
          trailerUrl={movieInfo.videos.results[0]?.key}
          backDrop={movieInfo.backdrop_path}
        />
        <TitleBox
          movieInfo={movieInfo}
          onClick={() => setShowDetailModal(undefined)}
        />
        <Content>
          {matchOrWatched}
          <p>{movieInfo.overview}</p>
        </Content>
      </MakeTitleBgTransparent>
      <VoteButtonGroup
        MiddleButtonText="Back"
        handleLike={() => console.log("like")}
        handleDislike={() => console.log("dislike")}
        handleClickMiddleButton={() => setShowDetailModal(undefined)}
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

  -webkit-mask-image: linear-gradient(to top, transparent 110px, black 140px);
`;

const Content = styled.div`
  padding: 0 2rem calc(var(--nav) + 7rem) 2rem;
`;
