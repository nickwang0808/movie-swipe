import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import styled from "styled-components/macro";
import VoteButtonGroup from "../../comp/ButtonGroups/VoteButtonGroup";
import MainBackground from "../../comp/Layout/MainBackground";
import { CenterLoader } from "../../comp/Misc/LoadingSpinner";
import MatchedWatchedWithBanner from "../../comp/MovieDetailsComp/MatchWatchBanner/MatchedWatchedWithBanner";
import TitleBox from "../../comp/MovieDetailsComp/TitleBox";
import Trailer from "../../comp/MovieDetailsComp/Trailer";
import fetchVidActorProvider from "../../Helper/fetchVidActorProvider";
import { IMovieDetailsForDetailsScreen } from "../../MovieTypes/IDetialsScreen";

interface IProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const MovieDetailsScreen: React.FC<IProps> = ({ match }) => {
  const id = match.params.id;
  const [movieInfo, setMovieInfo] = useState<IMovieDetailsForDetailsScreen>();

  useEffect(() => {
    if (!movieInfo || Number(id) != Number(movieInfo.id))
      (async () => {
        const res = await fetchVidActorProvider(id);
        setMovieInfo(res);
      })();
  }, [id]);

  const history = useHistory();

  if (!movieInfo || "release_dates" in movieInfo === false)
    return <CenterLoader />;
  return (
    <>
      <MainBackground ImgUrl={movieInfo.poster_path} />
      <MakeTitleBgTransparent>
        <Trailer
          trailerUrl={movieInfo.videos.results[0]?.key}
          backDrop={movieInfo.backdrop_path}
        />
        <TitleBox movieInfo={movieInfo} />
        <Content>
          <MatchedWatchedWithBanner matches />
          <p>{movieInfo.overview}</p>
        </Content>
      </MakeTitleBgTransparent>
      <VoteButtonGroup
        MiddleButtonText="Back"
        handleLike={() => console.log("like")}
        handleDislike={() => console.log("dislike")}
        handleClickMiddleButton={() => history.goBack()}
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
