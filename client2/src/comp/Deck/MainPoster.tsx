import React from "react";
import styled from "styled-components";
import baseUrl from "../../Helper/TmdbBaseUrl";

interface IProps {
  imgUrl: string;
}

export default function MainPoster({ imgUrl }: IProps) {
  return (
    <Wrapper imgUrl={imgUrl}>
      <div /> {/* this div contains the img */}
    </Wrapper>
  );
}

const Wrapper = styled.div<IProps>`
  position: absolute;
  width: var(--poster-width);
  height: var(--poster-height);
  max-width: 95%;
  margin: 0 auto;
  left: 0;
  right: 0;

  & div {
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
  }
`;
