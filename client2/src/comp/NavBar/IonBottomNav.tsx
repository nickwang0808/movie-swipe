import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React from "react";
import BottomNavIcon1 from "../../Assets/svg/BottomaNavIcon1.svg";
import BottomNavIcon2 from "../../Assets/svg/BottomaNavIcon2.svg";
import BottomNavIcon3 from "../../Assets/svg/BottomaNavIcon3.svg";
import Badge from "../Misc/Badge";

export default function IonBottomNav() {
  return (
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton /* tab="Watch_List" */ /* href="/mylist" */>
          <IonIcon src={BottomNavIcon1} size="large" />

          <IonLabel>Watch List</IonLabel>
          {/* <IonBadge color="warning">6</IonBadge> */}
          <Badge counter={5} />
        </IonTabButton>

        <IonTabButton /* tab="discovery" */ /* href="/home" */>
          <IonIcon src={BottomNavIcon2} size="large" />
          <IonLabel>Discovery</IonLabel>
        </IonTabButton>

        <IonTabButton /* tab="profile" */ /* href="/profile" */>
          <IonIcon src={BottomNavIcon3} size="large" />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
      <IonRouterOutlet />
    </IonTabs>
  );
}
