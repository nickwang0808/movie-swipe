import { IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MainHeader from "../../comp/Layout/MainHeader";
import SubContent from "../../comp/Layout/SubContent";
import FriendsItem from "../../comp/ListItem/FriendsItem";
import PendingInviteItem from "../../comp/ListItem/PendingInviteItem";
import InviteFriend from "../../comp/Misc/InviteFriend";
import DeleteFriendModal from "../../comp/Modals/DeleteFriendModal";
import acceptFriend from "../../firebase/firestoreOperations/acceptFriend";
import declineFriend from "../../firebase/firestoreOperations/declineFriend";
import { IProfileDetails } from "../../redux/Profile/profileReducer";
import { IAppState } from "../../store";

export default function FriendsScreen() {
  const { friends, received } = useSelector(
    (state: IAppState) => state.friends
  );

  const [
    showDelFriendModal,
    setShowDelFriendModal,
  ] = useState<IProfileDetails | null>(null);

  return (
    <>
      <DeleteFriendModal
        closeAction={() => setShowDelFriendModal(null)}
        showPopOver={Boolean(showDelFriendModal)}
        friend={showDelFriendModal}
      />

      <IonPage>
        <MainHeader title="Friends" />
        <IonContent>
          <p className="ion-margin">
            Simply invite a friend below, and we'll let you know when you both
            want to watch something!
          </p>

          {received && received.length > 0 && (
            <SubContent title="Requests">
              {received.map((user) => {
                return (
                  <PendingInviteItem
                    key={user.uid}
                    name={user.displayName || user.email || user.uid}
                    handleAccept={() => acceptFriend(user.uid)}
                    handleDecline={() => declineFriend(user.uid)}
                  />
                );
              })}
            </SubContent>
          )}
          {friends && friends.length > 0 && (
            <SubContent title="Friends">
              {friends.map((user) => {
                return (
                  <FriendsItem
                    key={user.uid}
                    friend={user}
                    deleteFriend={setShowDelFriendModal}
                  />
                );
              })}
            </SubContent>
          )}

          <SubContent title="Invite New Friends">
            <InviteFriend />
          </SubContent>
        </IonContent>
      </IonPage>
    </>
  );
}
