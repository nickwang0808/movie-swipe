import { Link } from "react-router-dom";
import styled from "styled-components/macro";

export const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  border: 2px solid var(--dark);
  text-align: center;
  border-radius: 5rem;
  color: #000000;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  margin: auto 0;
  padding: 0 3rem;
  /* line-height: 5rem; */
  font-weight: 600;
  font-size: 2rem;
  outline: none;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--dark);
`;

export const Separator = styled.div`
  height: 1rem;
  width: 100%;
  background-color: var(--gray);
`;

export const ErrorMessage = styled.p`
  margin: 1rem 0;
  color: #ff0000;
`;
