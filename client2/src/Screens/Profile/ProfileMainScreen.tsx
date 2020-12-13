import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import MainHeader from "../../comp/Layout/MainHeader";
import ProfileItem from "../../comp/ListItem/ProfileItem";
import { Separator } from "../../theme/BaseComp";

export default function ProfileMainScreen() {
  const history = useHistory();
  return (
    <>
      <IonPage>
        <MainHeader title="Profile" disableBackButton />
        <IonContent>
          <ProfileItem title="SignIn or Register" />
          <ProfileItem title="About Movie Sync" />
          <Separator />
          <ProfileItem
            title="Friends"
            action={() => history.push("/profile/friend")}
          />
          <ProfileItem title="hello" />
        </IonContent>
      </IonPage>
    </>
  );
}
