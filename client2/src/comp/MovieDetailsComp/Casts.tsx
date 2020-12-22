import React from "react";
import styled from "styled-components";
import { Cast } from "../../MovieTypes/ExtendedMovieDetails";
import CastCard from "./CastCard";
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
          return <CastCard key={cast.id} cast={cast} />;
        })}
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  overflow-x: auto;
`;
