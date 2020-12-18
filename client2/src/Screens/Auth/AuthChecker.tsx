import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CenterLoader } from "../../comp/Misc/LoadingSpinner";
import { auth } from "../../firebase/config";
import { userNotSigned, userSignedIn } from "../../redux/Auth/AuthReducer";
import { IAppState } from "../../store";
import SignInScreen from "./SignInScreen";

export default function AuthChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, isAnonymous, photoURL, uid } = user;
        dispatch(
          userSignedIn({ displayName, email, isAnonymous, photoURL, uid })
        );
      } else {
        dispatch(userNotSigned());
      }
    });
  }, [dispatch]);

  const authState = useSelector((state: IAppState) => state.auth);
  if (!authState.isLoaded) return <CenterLoader />;
  if (!authState.authenticated) return <SignInScreen />;
  return <>{children}</>;
}
