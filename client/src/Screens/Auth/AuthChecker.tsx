import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CenterLoader } from "../../comp/Misc/LoadingSpinner";
import { auth } from "../../firebase/config";
import newUserDBInit from "../../Helper/newUserDBInit";
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
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, email, isAnonymous, photoURL, uid } = user;
        await newUserDBInit({ displayName, email, isAnonymous, photoURL, uid });
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
  // const [innerWidth, setInnerWidth] = useState<number>();

  // useLayoutEffect(() => {
  //   setInnerWidth(window.innerWidth);
  // }, []);

  let screen;
  if (!showLogin) {
    screen = <OnBoardScreenOne setShowLogin={() => setShowLogin(true)} />;
  } else {
    screen = <SignInScreen />;
  }

  if (!authState.isLoaded) return <CenterLoader />;
  // if (innerWidth && innerWidth > 599) return <ScreenSize />;
  if (!authState.authenticated) return screen;
  return <>{children}</>;
}

// function ScreenSize() {
//   return (
//     <StyledDiv>
//       <p>
//         Movie Sync only works on mobile, please hit F12 and turn on mobile mode
//         or use a mobile device. We are a 2 man team design + dev, so give us a
//         break! :).
//       </p>
//     </StyledDiv>
//   );
// }
// const StyledDiv = styled.div`
//   height: 100vh;
//   width: 100vw;

//   display: flex;
//   justify-content: center;
//   align-items: center;

//   & p {
//     font-size: 4rem;
//     font-weight: 500;
//     line-height: 6rem;
//     padding: 0 2rem;
//   }
// `;
