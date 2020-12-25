import { IonFooter, IonPopover } from "@ionic/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import VoteButtonGroupV2 from "../../comp/ButtonGroups/VoteButtonGroupV2";
import { CenterLoader } from "../../comp/Misc/LoadingSpinner";
import WatchedWithWho from "../../comp/Modals/WatchedWithWho";
import Casts from "../../comp/MovieDetailsComp/Casts";
import MatchedWatchedWithBanner from "../../comp/MovieDetailsComp/MatchWatchBanner/MatchedWatchedWithBanner";
import Providers from "../../comp/MovieDetailsComp/Providers";
import TitleBox from "../../comp/MovieDetailsComp/TitleBox";
import Trailer from "../../comp/MovieDetailsComp/Trailer";
import updateVote from "../../firebase/firestoreOperations/updateVote";
import watchedMovie from "../../firebase/firestoreOperations/watchedMovie";
import parseProviderLogos, {
  parseProviderLink,
} from "../../Helper/parseProviderLogo";
import { IVotedMovies, IWatchedMovies } from "../../MovieTypes";
import { IExtendedMovieDetails } from "../../MovieTypes/ExtendedMovieDetails";
import { setModalToShow } from "../../redux/DetailsScreenState/DetailsScreenReducer";
import { IProfileDetails } from "../../redux/Profile/profileReducer";
import { IAppState, store } from "../../store";
import { IonContentWithBG } from "../MainScreen/MainScreen";

interface IProps {
  handleVote: (arg: boolean) => void;
}

export default function MovieDetailsScreen({ handleVote }: IProps) {
  const dispatch = useDispatch();
  const { movieToShow, loading, movieInfo } = useSelector(
    (state: IAppState) => state.detailsState
  );
  const liked = useSelector((state: IAppState) =>
    state.voted.Liked?.find((elem) => elem.id === movieToShow)
  );
  const disliked = useSelector((state: IAppState) =>
    state.voted.DisLiked?.find((elem) => elem.id === movieToShow)
  );
  const watched = useSelector((state: IAppState) =>
    state.voted.Watched?.find((elem) => elem.id === movieToShow)
  );

  // pull data from movie list first, if no data then pull from refetched list
  let newMovieInfo:
    | IExtendedMovieDetails
    | IVotedMovies
    | IWatchedMovies
    | null;
  if (movieToShow === store.getState().movieList.movieList[0].id) {
    newMovieInfo = store.getState().movieList
      .movieList[0] as IExtendedMovieDetails;
  } else if (movieToShow === liked?.id) {
    newMovieInfo = liked;
  } else if (movieToShow === watched?.id) {
    newMovieInfo = watched;
  } else if (movieToShow === disliked?.id) {
    newMovieInfo = disliked;
  } else {
    // fetch data
    newMovieInfo = null;
  }

  const [popOver, setPopOver] = useState(false);

  const handleWatched = (matchedWithIds: string[]) =>
    watchedMovie(matchedWithIds, movieToShow as number);

  const closeDetailsModal = () => dispatch(setModalToShow(null));

  const handleVoteWithDelay = (isLike: boolean) => {
    if (!liked && !disliked) {
      closeDetailsModal();
      setTimeout(() => {
        handleVote(isLike);
      }, 200);
    } else {
      // perform update preference
      console.log("update vote");
      if (movieToShow) updateVote(movieToShow, isLike);
    }
  };

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
          backDrop={newMovieInfo.backdrop_path || ""}
        />
        <TitleBox movieInfo={newMovieInfo} onClick={closeDetailsModal} />
        <div className="ion-padding-horizontal ion-padding-bottom">
          {matchOrWatched}
          <p>{newMovieInfo.overview}</p>
        </div>
        <Providers
          providers={parseProviderLogos(newMovieInfo["watch/providers"])}
          providerLink={parseProviderLink(newMovieInfo["watch/providers"])}
        />
        <Casts casts={newMovieInfo.credits.cast} />
        <div className="ion-margin-bottom" />?
      </BGContentWithFadeMask>

      <IonFooter className="ion-margin-top">
        <VoteButtonGroupV2
          handleLike={() => handleVoteWithDelay(true)}
          handleDislike={() => handleVoteWithDelay(false)}
          handleDetails={closeDetailsModal}
          handleTrailer={() => {}}
          showBackButton
          handleBack={closeDetailsModal}
          forceActiveLikeButton={Boolean(liked)}
          forceActiveDislikeButton={Boolean(disliked)}
        />
        <div className="ion-margin-vertical" />
      </IonFooter>
    </>
  );
}

const BGContentWithFadeMask = styled(IonContentWithBG)`
  &::part(scroll) {
    mask-image: linear-gradient(0deg, transparent 70px, black 110px);
  }
`;
