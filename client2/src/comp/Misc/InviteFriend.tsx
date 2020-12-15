import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import { cloudFn } from "../../firebase/config";
import { cloudFnNames } from "../../firebase/names";
import { IAppState } from "../../store";
import { Btn, ErrorMessage } from "../../theme/BaseComp";

export default function InviteFriend() {
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState<string>();
  const [disableInvite, setDisableInvite] = useState(false);
  const myEmail = useSelector(
    (state: IAppState) => state.profile.profile?.email as string
  );

  const { profile } = useSelector((state: IAppState) => state.profile);

  const handleInvite = async () => {
    setDisableInvite(true);

    if (emailInput === myEmail) {
      setMessage("you can't add yourself as friend");
    } else if (emailInput.length === 0) {
      setMessage("please input email");
    } else if (!profile) {
      setMessage("Your profile is empty, something wrong has happened");
    } else {
      const friendReqStatus = await cloudFn.httpsCallable(
        cloudFnNames.sendFriendReq
      )({
        email: emailInput,
        myInfo: profile,
      });

      if (
        friendReqStatus.data.message ===
        "There is no user record corresponding to the provided identifier."
      ) {
        setMessage("No users with this email");
      } else {
        setMessage(friendReqStatus.data.message);
      }
      setEmailInput("");
    }
    setDisableInvite(false);
  };

  return (
    <>
      <StyledInputWrapper>
        <input
          type="text"
          placeholder="Enter email..."
          onChange={(e) => setEmailInput(e.target.value)}
          value={emailInput}
        />
        <StyledButton
          as="button"
          disabled={disableInvite}
          onClick={handleInvite}
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
