import { IonFooter } from "@ionic/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import VoteButtonGroupV2 from "../../comp/ButtonGroups/VoteButtonGroupV2";
import DividerTall from "../../comp/Misc/DividerTall";
import { CenterLoader } from "../../comp/Misc/LoadingSpinner";
import Casts from "../../comp/MovieDetailsComp/Casts";
import MatchedWatchedWithBanner from "../../comp/MovieDetailsComp/MatchWatchBanner/MatchedWatchedWithBanner";
import Providers from "../../comp/MovieDetailsComp/Providers";
import TitleBox from "../../comp/MovieDetailsComp/TitleBox";
import Trailer from "../../comp/MovieDetailsComp/Trailer";
import updateVote from "../../firebase/firestoreOperations/updateVote";
import parseProviderLogos, {
  parseProviderLink,
} from "../../Helper/parseProviderLogo";
import {
  IVotedMovies,
  IVotedMTvs,
  IWatchedMovies,
  IWatchedTvs,
} from "../../MovieTypes";
import { IExtendedMovieDetails } from "../../MovieTypes/ExtendedMovieDetails";
import { setModalToShow } from "../../redux/DetailsScreenState/DetailsScreenReducer";
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
    (state.voted.Liked as (IVotedMovies | IVotedMTvs)[]).find(
      (elem) => elem.id === movieToShow
    )
  );
  const disliked = useSelector((state: IAppState) =>
    (state.voted.DisLiked as (IVotedMovies | IVotedMTvs)[]).find(
      (elem) => elem.id === movieToShow
    )
  );
  const watched = useSelector((state: IAppState) =>
    (state.voted.Watched as (IWatchedMovies | IWatchedTvs)[]).find(
      (elem) => elem.id === movieToShow
    )
  );

  // pull data from movie list first, if no data then pull from refetched list
  let newMovieInfo:
    | IExtendedMovieDetails
    | IWatchedMovies
    | IWatchedTvs
    | IVotedMovies
    | IVotedMTvs
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
      <>
        <DividerTall />
        <MatchedWatchedWithBanner
          matches={liked?.matchedWith}
          watchedWith={watched?.watchedWith}
          movieId={movieToShow as number}
        />
      </>
    );
  }

  if (loading || !newMovieInfo) return <CenterLoader />;
  return (
    <>
      <BGContentWithFadeMask fullscreen bg={newMovieInfo.poster_path}>
        <Trailer
          trailerUrl={newMovieInfo.videos.results[0]?.key}
          backDrop={newMovieInfo.backdrop_path || ""}
        />
        <TitleBox movieInfo={newMovieInfo} onClick={closeDetailsModal} />
        <div className="ion-padding-horizontal">
          {matchOrWatched}
          <DividerTall />
          <p>{newMovieInfo.overview}</p>
        </div>
        <Providers
          providers={parseProviderLogos(newMovieInfo["watch/providers"])}
          providerLink={parseProviderLink(newMovieInfo["watch/providers"])}
        />
        <Casts casts={newMovieInfo.credits.cast} />
        <div className="ion-margin-bottom" />
      </BGContentWithFadeMask>

      <IonFooter className="ion-margin-top" mode="ios">
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
    mask-image: linear-gradient(0deg, transparent 60px, black 100px);
  }
`;
