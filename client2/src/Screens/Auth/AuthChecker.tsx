import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CenterLoader } from "../../comp/Misc/LoadingSpinner";
import { auth } from "../../firebase/config";
import useGetWIndowsSizing from "../../Helper/useGetWIndowsSizing";
import { userNotSigned, userSignedIn } from "../../redux/Auth/AuthReducer";
import { IAppState } from "../../store";
import OnBoardScreenOne from "../OnBoarding/OnBoardScreenOne";
import SignInScreen from "./SignInScreen";
// import OnBoardScreenOne from "../OnBoarding/OnBoardScreenOne";

export default function AuthChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useGetWIndowsSizing();
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

  const [showLogin, setShowLogin] = useState(false);

  let screen;
  if (!showLogin) {
    screen = <OnBoardScreenOne setShowLogin={() => setShowLogin(true)} />;
  } else {
    screen = <SignInScreen />;
  }

  if (!authState.isLoaded) return <CenterLoader />;
  // if (!authState.authenticated) return <OnBoardScreenOne />;
  if (!authState.authenticated) return screen;
  return <>{children}</>;
}
