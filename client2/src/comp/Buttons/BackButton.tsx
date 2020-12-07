import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function BackButton() {
  const history = useHistory();

  return (
    <StyledLink onClick={() => history.goBack()}>
      <svg
        width="20"
        height="18"
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.7071 1.70712L9.29292 0.292908L0.585815 9.00001L9.29292 17.7071L10.7071 16.2929L4.41423 10H19.5V8H4.41426L10.7071 1.70712Z" />
      </svg>
    </StyledLink>
  );
}

const StyledLink = styled.div`
  display: inline-block;
  margin-right: 2rem;

  & svg {
    fill: var(--light);
  }
`;
