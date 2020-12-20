import React from "react";
import styled from "styled-components/macro";
import { baseUrlLogo } from "../../Helper/TmdbBaseUrl";

interface IProps {
  providers: string[] | null;
}

export default function Providers({ providers }: IProps) {
  if (!providers) return null;
  return (
    <div className="ion-padding">
      <Title>Available On:</Title>
      <Wrapper>
        {providers.map((logo) => {
          return <img src={baseUrlLogo + logo} alt="providers" />;
        })}
      </Wrapper>
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
  grid-template-columns: repeat(auto-fit, 50px);
  gap: 4px;

  & img {
    height: auto;
    width: 50px;

    background: #ffffff;
    border: 3px solid #000000;
    box-sizing: border-box;
    border-radius: 7px;
  }
`;
