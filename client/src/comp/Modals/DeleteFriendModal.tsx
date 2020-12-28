import { IonAlert } from "@ionic/react";
import React from "react";
import deleteFriend from "../../firebase/firestoreOperations/deleteFriend";
import { IProfileDetails } from "../../redux/Profile/profileReducer";

interface IProps {
  closeAction: () => void;
  showPopOver: boolean;
  friend: IProfileDetails | null;
}

export default function DeleteFriendModal({
  closeAction,
  showPopOver,
  friend,
}: IProps) {
  if (!friend) return null;
  return (
    <IonAlert
      isOpen={showPopOver}
      onDidDismiss={closeAction}
      header={"Remove Friend"}
      message={`    
          You are about to remove your friend&nbsp;
         ${friend.displayName || friend.email}. are you sure?
       `}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Remove",
          handler: () => {
            deleteFriend(friend.uid);
            closeAction();
          },
        },
      ]}
    />
  );
}
