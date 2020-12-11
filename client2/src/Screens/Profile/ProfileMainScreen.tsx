import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import MainHeader from "../../comp/Layout/MainHeader";
import ProfileItem from "../../comp/ListItem/ProfileItem";
import { Separator } from "../../theme/BaseComp";

export default function ProfileMainScreen() {
  return (
    <IonPage>
      <MainHeader title="Profile" disableBackButton />
      <IonContent>
        <ProfileItem title="SignIn or Register" />
        <ProfileItem title="About Movie Sync" />
        <Separator />
        <ProfileItem title="hello" />
        <ProfileItem title="hello" />
      </IonContent>
    </IonPage>
  );
}
