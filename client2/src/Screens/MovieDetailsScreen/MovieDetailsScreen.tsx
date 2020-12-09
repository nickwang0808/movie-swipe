import React from "react";
import styled from "styled-components/macro";
import VoteButtonGroup from "../../comp/ButtonGroups/VoteButtonGroup";
import MainBackground from "../../comp/Layout/MainBackground";
import MatchedWatchedWithBanner from "../../comp/MovieDetailsComp/MatchWatchBanner/MatchedWatchedWithBanner";
import TitleBox from "../../comp/MovieDetailsComp/TitleBox";
import Trailer from "../../comp/MovieDetailsComp/Trailer";

const dummy = {
  ImgUrl: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  trailerUrl:
    "https://www.youtube.com/embed/DWfPGIMDhNw?rel=0;controls=1;showinfo=0;fs=1;modestbranding=1",
  text:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ipsum repellendus recusandae modi dolor tenetur ut iste dignissimos id ea quasi repellat, et commodi. Sed hic doloribus fugiat rem distinctio?",
};

const voteDummy = {
  MiddleButtonText: "Details",
  handleClickMiddleButton: () => console.log("Click middle"),
  handleDislike: () => console.log("dislike"),
  handleLike: () => console.log("Like"),
};

export default function MovieDetailsScreen() {
  return (
    <>
      <MainBackground ImgUrl={dummy.ImgUrl} />
      <MakeTitleBgTransparent>
        <Trailer trailerUrl={dummy.trailerUrl} />
        <TitleBox poster_path={dummy.ImgUrl} />
        <Content>
          <MatchedWatchedWithBanner matches />
          <p>{dummy.text}</p>
        </Content>
      </MakeTitleBgTransparent>
      <VoteButtonGroup {...voteDummy} />
    </>
  );
}

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
