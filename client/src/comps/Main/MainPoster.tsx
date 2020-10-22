import React from "react";

interface IMainPosterProps {
  imgUrl: string;
}

export default function MainPoster({ imgUrl }: IMainPosterProps) {
  const posterStyle = {
    backgroundImage: `linear-gradient(25deg, rgba(255, 255, 255, 0) 51.03%, rgba(255, 255, 255, 0.3) 58.85%, rgba(255, 255, 255, 0.3) 99.3%), linear-gradient(360deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 20%), url(${imgUrl})`,
  };

  return (
    <>
      {/* <div className="poster_vote" id="poster_3" />
        // <div className="poster_vote" id="poster_2" /> */}
      {/* <div className="poster_vote" id="poster_1" style={posterStyle}> */}
      <div className="poster_vote" id="poster_1" style={posterStyle}>
        <h3 className="poster_overview">
          {/* PG-13 | 2h 3min | Adventure, Crime, Drama | 2020 (USA) */}
          {/* {` ${movieInfo?.genre.join(", ")} | ${movieInfo?.released}`} */}
        </h3>
      </div>
    </>
  );
}
