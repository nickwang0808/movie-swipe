import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

interface INavProps {
  watchListBadgeCounter: number;
  profileBadgeCounter: number;
}

export default function BottomNav({
  profileBadgeCounter,
  watchListBadgeCounter,
}: INavProps) {
  return (
    <></>
    // <Wrapper>
    //   <StyledNavLink activeClassName="Bottom_nav_active" to="/mylist">
    //     <NavItem>
    //       {watchListBadgeCounter > 0 && (
    //         <Badge counter={watchListBadgeCounter} />
    //       )}
    //       <BottomaNavIcon1 />
    //       <br />
    //       Watch List
    //     </NavItem>
    //   </StyledNavLink>
    //   <StyledNavLink activeClassName="Bottom_nav_active" to="/home">
    //     <NavItem>
    //       <BottomaNavIcon2 />
    //       <br />
    //       Find Media
    //     </NavItem>
    //   </StyledNavLink>
    //   <StyledNavLink activeClassName="Bottom_nav_active" to="/profile">
    //     <NavItem>
    //       {profileBadgeCounter > 0 && <Badge counter={profileBadgeCounter} />}
    //       <BottomaNavIcon3 />
    //       <br />
    //       Profile
    //     </NavItem>
    //   </StyledNavLink>
    // </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  z-index: 999;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--light);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--nav);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: var(--dark);
  flex-grow: 1;
  width: 33%;
`;

const NavItem = styled.div`
  cursor: pointer;
  margin: 0.5rem 1rem;
  text-align: center;
  font-size: 1.8rem;
  line-height: 2rem;
  font-weight: 600;
  position: relative;

  &:hover,
  &:active,
  &:hover > svg,
  &:active > svg {
    color: var(--highlight);
    fill: var(--highlight);
  }
`;
