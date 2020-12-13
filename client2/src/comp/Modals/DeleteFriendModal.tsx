import React from "react";
import styled from "styled-components";
import { Btn } from "../../theme/BaseComp";
import ModalBase from "./ModalBase/ModalBase";

interface IProps {
  closeAction: () => void;
}

export default function DeleteFriendModal({ closeAction }: IProps) {
  return (
    <ModalBase closeAction={closeAction}>
      <h1>Delete Your Account</h1>
      <StyledBodyWrapper>
        <p>
          You are about to delete your account. All your matches, friends and
          associated data will be removed. Thanks for joining us!
        </p>
        <DeleteButtonWrapper>
          <StyledButton onClick={closeAction}>Delete Account</StyledButton>
        </DeleteButtonWrapper>
      </StyledBodyWrapper>
    </ModalBase>
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
