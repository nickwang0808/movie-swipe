import { IonSpinner } from "@ionic/react";
import React from "react";
import styled from "styled-components/macro";
import parseCerts from "../../Helper/parseCerts";
import baseUrl from "../../Helper/TmdbBaseUrl";
import { IExtendedMovieDetails } from "../../MovieTypes/ExtendedMovieDetails";
import { IExtendedTvDetails } from "../../MovieTypes/ExtendedTvDetails";
import CircleDial from "../Misc/CircleDial";
import GenreRunTimeYear from "../Misc/GenreRunTimeYear";

interface IProps {
  imgUrl: string;
  showAdditionalInfo?: boolean;
  movieInfo?: IExtendedMovieDetails | IExtendedTvDetails;
}

export default function MainPoster({
  imgUrl,
  movieInfo,
  showAdditionalInfo = false,
}: IProps) {
  const additionalInfoElem = movieInfo ? (
    <>
      <StyledMetaDataWrapper>
        <CircleDial number={movieInfo.vote_average * 10} />
        <GenreRunTimeYear
          certs={
            "release_dates" in movieInfo
              ? parseCerts(movieInfo.release_dates)
              : undefined
          }
          runTime={"runtime" in movieInfo ? movieInfo.runtime : undefined}
          genreIds={movieInfo.genres.map((elem) => elem.id)}
          year={
            "release_date" in movieInfo
              ? String(movieInfo.release_date).slice(0, 4)
              : movieInfo.last_air_date.slice(0, 4)
          }
        />
      </StyledMetaDataWrapper>
    </>
  ) : (
    <StyledSpinner name="crescent" color="light" />
  );

  return (
    <Wrapper imgUrl={imgUrl}>
      <div>
        {showAdditionalInfo && (
          <AdditionALInfoWrapper>{additionalInfoElem}</AdditionALInfoWrapper>
        )}
      </div>
    </Wrapper>
  );
}

const StyledMetaDataWrapper = styled.div`
  display: flex;
  margin-top: 16px;
`;

const Wrapper = styled.div<{ imgUrl: string }>`
  position: absolute;
  width: var(--poster-width);
  height: var(--poster-height);
  max-width: 95%;
  margin: 0 auto;
  left: 0;
  right: 0;

  & > div {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    z-index: 5;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3), 0px 10px 20px rgba(0, 0, 0, 0.3);

    background-image: linear-gradient(
        25deg,
        rgba(255, 255, 255, 0) 52%,
        rgba(255, 255, 255, 0.2) 53%,
        rgba(255, 255, 255, 0.2) 100%
      ),
      url(${(props) => baseUrl + props.imgUrl});

    display: flex; /* layout additional info */
    flex-direction: column;
    justify-content: flex-end;
  }
`;

const AdditionALInfoWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  padding-bottom: 12px;
  padding-left: 8px;
  color: white;

  height: 75px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 212, 255, 0) 100%
  );

  & > div {
    /* make sure both icon and text are centered horizontaly */
    margin-bottom: 2px;
  }

  & * {
    /* over ride opacity set in GenreRunTimeYear comp */
    opacity: 1;
  }

  & h3 {
    color: white;
    word-break: break-word;

  }

  & img {
    /* svg icon */
    margin: 0 8px;
  }
`;

const StyledSpinner = styled(IonSpinner)`
  margin: 0 8px;
`;
