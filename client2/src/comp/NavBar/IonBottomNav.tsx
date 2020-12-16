import {
  IonBadge,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
} from "@ionic/react";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import BottomNavIcon1 from "../../Assets/svg/BottomaNavIcon1.svg";
import BottomNavIcon2 from "../../Assets/svg/BottomaNavIcon2.svg";
import BottomNavIcon3 from "../../Assets/svg/BottomaNavIcon3.svg";

export default function IonBottomNav() {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="Watch_List" href="/mylist">
        <IonIcon src={BottomNavIcon1} size="large" />

        <IonLabel>Watch List</IonLabel>
        <IonBadge color="warning">6</IonBadge>
      </IonTabButton>

      <IonTabButton tab="discovery" href="/home">
        <IonIcon src={BottomNavIcon2} size="large" />
        <IonLabel>Discovery</IonLabel>
      </IonTabButton>

      <IonTabButton tab="profile" href="/profile">
        <IonIcon src={BottomNavIcon3} size="large" />
        <IonLabel>Profile</IonLabel>
      </IonTabButton>
    </IonTabBar>
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
