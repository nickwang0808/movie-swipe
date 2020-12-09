import React from "react";
import styled from "styled-components/macro";
import { Btn, ErrorMessage } from "../../theme/BaseComp";

export default function InviteFriend({ message }: { message: string }) {
  return (
    <>
      <StyledInputWrapper>
        <input
          type="text"
          placeholder="Enter email..."
          // onChange={(e) => setEmailInput(e.target.value)}
          // value={emailInput}
        />
        <StyledButton
          as="button"
          // disabled={disableInvite}
          // onClick={handleInvite}
        >
          Invite
        </StyledButton>
      </StyledInputWrapper>
      {message && <ErrorMessage>{message}</ErrorMessage>}
    </>
  );
}

const StyledButton = styled(Btn)`
  &:active {
    border-color: var(--highlight);
    color: var(--highlight);
  }
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2rem;
  margin-left: 2rem;
  margin-right: 2rem;

  & input {
    flex-grow: 1;
    margin-right: 2rem;
    margin-bottom: 0rem;
    min-width: 100px;
    font-size: 2rem;
  }
  & + p {
    margin-left: 2rem;
  }
`;
