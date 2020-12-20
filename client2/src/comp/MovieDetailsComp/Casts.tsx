import React from "react";
import styled from "styled-components";
import { baseUrlLogo } from "../../Helper/TmdbBaseUrl";
import { Cast } from "../../MovieTypes/IDetialsScreen";
import { Title } from "./Providers";

interface IProps {
  casts: Cast[] | null;
}

export default function Casts({ casts }: IProps) {
  if (!casts) return null;
  return (
    <div className="ion-padding-horizontal">
      <Title>Casts: </Title>
      <Wrapper>
        {casts.map((cast) => {
          if (!cast.profile_path) return null;
          return <img src={baseUrlLogo + cast.profile_path} alt="casts" />;
        })}
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 50px);
  gap: 4px;

  & img {
    height: auto;
    width: 50px;

    background: #ffffff;
    /* border: 3px solid #000000; */
    box-sizing: border-box;
    border-radius: 7px;
  }
`;
