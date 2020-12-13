import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

export default function TopTab() {
  return (
    <Wrapper>
      <StyledNavLink exact to="/mylist/liked" activeClassName="top_nav_active">
        My Movies
      </StyledNavLink>
      <StyledNavLink
        exact
        to="/mylist/watched"
        activeClassName="top_nav_active"
      >
        Watched
      </StyledNavLink>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: var(--light);
  font-size: 1.8rem;
  margin: 2rem 2rem 0 2rem;
  border: 1px solid var(--dark);
  border-radius: 3rem;
  position: sticky;
  top: 1rem;
  z-index: 2;
`;

const StyledNavLink = styled(NavLink)`
  text-align: center;
  flex-grow: 1;
  font-weight: 600;
  text-decoration: none;
  color: var(--dark);
`;
