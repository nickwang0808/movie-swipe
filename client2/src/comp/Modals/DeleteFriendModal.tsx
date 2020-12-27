import { IonPopover } from "@ionic/react";
import React from "react";
import styled from "styled-components";
import deleteFriend from "../../firebase/firestoreOperations/deleteFriend";
import { IProfileDetails } from "../../redux/Profile/profileReducer";
import { Btn } from "../../theme/BaseComp";

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
    <IonPopover isOpen={showPopOver} onDidDismiss={() => closeAction()}>
      <h1>Delete Friend</h1>
      <StyledBodyWrapper>
        <p>
          You are about to delete your friend&nbsp;
          <strong>{friend.displayName || friend.email}</strong>. are you sure?
        </p>
        <DeleteButtonWrapper>
          <StyledButton
            onClick={() => {
              deleteFriend(friend.uid);
              closeAction();
            }}
          >
            Delete Friend
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
