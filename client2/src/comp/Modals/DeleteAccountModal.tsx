import { IonPopover } from "@ionic/react";
import React from "react";
import styled from "styled-components";
import { auth } from "../../firebase/config";
import { Btn } from "../../theme/BaseComp";

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
    <IonPopover isOpen={showPopOver} onDidDismiss={() => closeAction()}>
      <h1>Delete Your Account</h1>
      <StyledBodyWrapper>
        <p>
          You are about to delete your account. All your matches, friends and
          associated data will be removed. Thanks for joining us!
        </p>
        <DeleteButtonWrapper>
          <StyledButton onClick={handleDeleteAccount}>
            Delete Account
          </StyledButton>
        </DeleteButtonWrapper>
      </StyledBodyWrapper>
    </IonPopover>
  );
}

const StyledBodyWrapper = styled.div`
  padding: 1rem 2rem 2rem 2rem;
`;

const DeleteButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const StyledButton = styled(Btn)`
  &:active {
    border-color: var(--highlight);
    color: var(--highlight);
  }
`;
