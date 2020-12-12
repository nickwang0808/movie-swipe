import React from "react";
import { useSelector } from "react-redux";
import { isEmpty, isLoaded, useFirebase } from "react-redux-firebase";
import styled from "styled-components";
import { CenterLoader } from "../../comp/Misc/LoadingSpinner";
import { IAppState } from "../../store";

export default function AuthChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const firebase = useFirebase();

  function loginWithGoogle() {
    return firebase.login({ provider: "google", type: "popup" });
  }

  const auth = useSelector((state: IAppState) => state.firebase.auth);
  if (!isLoaded(auth)) return <CenterLoader />;
  if (isEmpty(auth))
    return <StyledButton onClick={loginWithGoogle}>Sign In</StyledButton>;
  return <>{children}</>;
}

const StyledButton = styled.button`
  font-size: 30px;
`;
