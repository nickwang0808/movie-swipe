import React from "react";
import DownVote from "../ButtonComps/DownVote";
import FilterButton from "../ButtonComps/FilterButton";
import UpVote from "../ButtonComps/UpVote";
import Logo from "../Decorators/Logo";

interface ImovieInfo {
  imageurl: string[];
  genre: string[];
  imdbid: string;
  synopsis: string;
  title: string;
  type: string;
  released: number;
}

interface ICompProps {
  movieInfo: ImovieInfo;
  handleLike: () => void;
}

export default function LikeOrNo({ movieInfo, handleLike }: ICompProps) {
  const backgroundStyle = {
    background: `linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${movieInfo?.imageurl[0]})`,
  };

  const posterStyle = {
    backgroundImage: `linear-gradient(25.4deg, rgba(255, 255, 255, 0) 51.03%, rgba(255, 255, 255, 0.3) 58.85%, rgba(255, 255, 255, 0.3) 99.3%), linear-gradient(360deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 20%), url(${movieInfo?.imageurl[0]})`,
  };

  return (
    <>
      <div className="background" style={backgroundStyle} />
      <div className="content">
        <div className="container_header">
          <Logo />
          <FilterButton />
        </div>
        <div className="container_poster">
          <div className="poster_vote" id="poster_3" />
          <div className="poster_vote" id="poster_2" />
          <div className="poster_vote" id="poster_1" style={posterStyle}>
            <h3 className="poster_overview">
              {/* PG-13 | 2h 3min | Adventure, Crime, Drama | 2020 (USA) */}
              {` ${movieInfo?.genre.join(", ")} | ${movieInfo?.released}`}
            </h3>
          </div>
        </div>
        <div className="container_vote">
          <DownVote />
          <div className="btn btn_details">Details</div>
          <UpVote handleLike={handleLike} />
        </div>
      </div>
    </>
  );
}
