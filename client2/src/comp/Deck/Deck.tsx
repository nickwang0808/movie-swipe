import React from "react";
import { dummyMovieList } from "../../DevTools/dummyData";
import DeckWrapper from "./DeckWrapper";
import LeadCard from "./LeadCard";
import TrailCards from "./TrailCards";

interface IProps {
  movieListInDeck: typeof dummyMovieList.results;
}

export default function Deck({ movieListInDeck }: IProps) {
  return (
    <DeckWrapper>
      {movieListInDeck
        .map((movie, i) => {
          if (i !== 0)
            return (
              <TrailCards key={movie.id} index={i} imgUrl={movie.poster_path} />
            );

          return (
            <LeadCard key={movie.id} index={i} imgUrl={movie.poster_path} />
          );
        })
        .reverse()}
    </DeckWrapper>
  );
}
