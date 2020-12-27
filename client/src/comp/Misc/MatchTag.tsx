import React from "react";
import styled from "styled-components/macro";

interface IProps {
  isNew?: boolean;
}

export default function MatchTag({ isNew = false }: IProps) {
  return (
    <StyledFlexBox>
      {isNew && (
        <RedTagWrapper>
          <ForceSkew>
            <div>New</div>
          </ForceSkew>
        </RedTagWrapper>
      )}

      <TagWrapper>
        <ForceSkew>
          <div>Matched</div>
        </ForceSkew>
      </TagWrapper>
    </StyledFlexBox>
  );
}

const StyledFlexBox = styled.div`
  display: flex;
`;

const TagWrapper = styled.div`
  padding: 0.2em 1rem 0.1rem 1rem;
  background-color: var(--positive);
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 0.3rem;
  transform: skewX(-15deg);
  width: fit-content;
  margin-bottom: 0.5rem;
`;

const ForceSkew = styled.div`
  /* return the text to normal */
  transform: skewX(15deg);
`;

const RedTagWrapper = styled(TagWrapper)`
  background-color: var(--highlight);
  margin-right: 4px;

  & div {
    color: var(--light);
  }
`;
