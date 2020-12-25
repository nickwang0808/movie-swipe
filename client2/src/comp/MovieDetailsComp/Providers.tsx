import React from "react";
import styled from "styled-components/macro";
import { baseUrlLogo } from "../../Helper/TmdbBaseUrl";
import { Btn } from "../../theme/BaseComp";

interface IProps {
  providers: string[] | null;
  providerLink: string | null;
}

export default function Providers({ providers, providerLink }: IProps) {
  if (!providers) return null;
  return (
    <div className="ion-padding">
      <Title>Available On:</Title>
      <Wrapper>
        {providers.map((logo) => {
          return <img src={baseUrlLogo + logo} alt="providers" key={logo} />;
        })}
      </Wrapper>
      <p className="ion-margin-vertical">
        To stream, rent or buy this media, visit TMDB
      </p>
      <Btn
        onClick={() => {
          /* go to tmdb affiliate link */
          providerLink && window.open(providerLink);
        }}
      >
        TMDB
      </Btn>
    </div>
  );
}

export const Title = styled.h3.attrs({
  className: "ion-margin-vertical",
})`
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 52px);
  gap: 1rem;

  & img {
    box-sizing: border-box;
    border-radius: 5px;
  }
`;
