import React from "react";
import convertHDimg from "../../HelperFunctions/convertHDimg";

interface IMainPosterProps {
  imgUrl_1: string;
  imgUrl_2: string;
  imgUrl_3: string;
}

export default function MainPoster({
  imgUrl_1,
  imgUrl_2,
  imgUrl_3,
}: IMainPosterProps) {
  const assignUrlToPoster = (url: string) => {
    const newUrl = convertHDimg(url);
    return `linear-gradient(25deg, rgba(255, 255, 255, 0) 51.03%, rgba(255, 255, 255, 0.3) 58.85%, rgba(255, 255, 255, 0.3) 99.3%), linear-gradient(360deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 10%), url(${newUrl})`;
  };

  return (
    <>
      <div
        className="poster_vote"
        id="poster_3"
        style={{ backgroundImage: assignUrlToPoster(imgUrl_3) }}
      />
      <div
        className="poster_vote"
        id="poster_2"
        style={{ backgroundImage: assignUrlToPoster(imgUrl_2) }}
      />
      <div
        className="poster_vote"
        id="poster_1"
        style={{ backgroundImage: assignUrlToPoster(imgUrl_1) }}
      >
        <h3 className="poster_overview">
          {/* PG-13 | 2h 3min | Adventure, Crime, Drama | 2020 (USA) */}
          {/* {` ${movieInfo?.genre.join(", ")} | ${movieInfo?.released}`} */}
        </h3>
      </div>
    </>
  );
}
