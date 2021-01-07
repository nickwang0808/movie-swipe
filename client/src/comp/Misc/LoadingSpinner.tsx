import styled from "styled-components";

export const Loader = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  margin: 0 auto;
  border-top: 2px solid var(--highlight);
  border-right: 2px solid transparent;
  animation: loader 650ms linear infinite;
  z-index: 10;
  position: absolute;

  @keyframes loader {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const CenterLoader = styled(Loader)`
  top: calc(50% - 40px);
  left: calc(50% - 40px);
`;
