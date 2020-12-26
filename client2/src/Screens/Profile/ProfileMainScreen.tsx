import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import MainHeader from "../../comp/Layout/MainHeader";
import ProfileItem from "../../comp/ListItem/ProfileItem";
import { auth } from "../../firebase/config";
import { IUserAuth } from "../../redux/Auth/AuthReducer";
import { IAppState } from "../../store";
import { Separator } from "../../theme/BaseComp";

export default function ProfileMainScreen() {
  const history = useHistory();
  const { isAnonymous, displayName, email, uid } = useSelector(
    (state: IAppState) => state.auth.user
  ) as IUserAuth;

  const inviteCount = useSelector(
    (state: IAppState) => state.friends.received?.length
  ) as number;

  const handleSignOut = async () => {
    await auth.signOut();
    window.location.reload();
  };

  if (!isAnonymous) {
    return (
      <>
        <IonPage>
          <MainHeader title="Profile" disableBackButton />
          <IonContent>
            <ProfileItem
              title="Friends"
              action={() => history.push("/profile/friend")}
              notify={inviteCount > 0 ? inviteCount : undefined}
            />
            <ProfileItem
              title="Disliked Movies"
              action={() => history.push("/profile/disliked")}
            />
            <ProfileItem
              title="About Movie-Sync"
              action={() => history.push("/profile/about")}
            />
            <Separator />
            <ProfileItem
              title={`Sign Out (${displayName || email || uid})`}
              action={handleSignOut}
            />
            <ProfileItem title="Delete Account" action={handleSignOut} />
          </IonContent>
        </IonPage>
      </>
    );
  } else {
    return (
      <IonPage>
        <MainHeader title="Profile" disableBackButton />
        <IonContent>
          <ProfileItem title="SignIn or Register" />
          <ProfileItem title="About Movie Sync" />
          <Separator />
          <ProfileItem title="Delete Account" />
        </IonContent>
      </IonPage>
    );
  }
}
