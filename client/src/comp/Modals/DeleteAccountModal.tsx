import { IonAlert } from "@ionic/react";
import React from "react";
import { auth } from "../../firebase/config";

interface IProps {
  closeAction: () => void;
  showPopOver: boolean;
}

export default function DeleteAccountModal({
  closeAction,
  showPopOver,
}: IProps) {
  const handleDeleteAccount = async () => {
    await auth.currentUser?.delete();
    window.location.reload();
  };

  return (
    <IonAlert
      isOpen={showPopOver}
      onDidDismiss={closeAction}
      header={"Delete Your Account"}
      message={`You are about to delete your account. All your matches, friends and
    associated data will be removed. Thanks for joining us!`}
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
          text: "Delete",
          handler: handleDeleteAccount,
        },
      ]}
    />
  );
}
