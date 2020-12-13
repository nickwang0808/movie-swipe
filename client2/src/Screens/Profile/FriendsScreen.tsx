import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import MainHeader from "../../comp/Layout/MainHeader";
import SubContent from "../../comp/Layout/SubContent";
import FriendsItem from "../../comp/ListItem/FriendsItem";
import PendingInviteItem from "../../comp/ListItem/PendingInviteItem";
import InviteFriend from "../../comp/Misc/InviteFriend";

export default function FriendsScreen() {
  return (
    <IonPage>
      <MainHeader title="Friends" />
      <IonContent>
        <p className="marginSides2 marginTop2 marginBottom2">
          We'll let you know when you and your friends both want to watch
          something!
        </p>

        <SubContent title="Requests">
          <PendingInviteItem
            name="Nick Wang"
            handleAccept={() => console.log("Accpet")}
            handleDecline={() => console.log("Accpet")}
          />
        </SubContent>
        <SubContent title="Friends">
          <FriendsItem name="Nick Wang" />
          <FriendsItem name="Nick Wang" />
          <FriendsItem name="Nick Wang" />
        </SubContent>

        <SubContent title="Invite New Friends">
          <InviteFriend />
        </SubContent>
      </IonContent>
    </IonPage>
  );
}
