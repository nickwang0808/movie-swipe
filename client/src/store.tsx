import React, { useContext, useEffect, useState } from "react";
import useGetUser from "./db-operations/useGetUser";
import { auth } from "./firebase/config";

interface IUser {
  isLoggedIn: boolean;
  userInfo: firebase.User | null;
}

const defaultUser = { isLoggedIn: false, userInfo: null };
export const UserContext = React.createContext({} as any);
const UserProvider = UserContext.Provider;

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userAuth, setUserAuth] = useState<IUser>(defaultUser);
  const userProfile = useGetUser(userAuth.userInfo?.uid as string);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUserAuth({ isLoggedIn: true, userInfo: user });
        console.log("This is the user: ", user);
      } else {
        setUserAuth(defaultUser);
        console.log("There is no logged in user");
      }
    });
  }, []);

  return (
    <UserProvider value={{ userAuth, userProfile }}>{children}</UserProvider>
  );
}
