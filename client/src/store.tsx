import React, { useEffect, useState } from "react";
import useGetUser from "./db-operations/useGetUser";
import { auth } from "./firebase/config";

interface IUser {
  isLoggedIn: boolean;
  userInfo: firebase.User;
}

interface IStore {
  userAuth: IUser | null;
  userProfile: any;
}

export const UserContext = React.createContext({} as IStore);
const UserProvider = UserContext.Provider;

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userAuth, setUserAuth] = useState<IUser | null>(null);
  const userProfile = useGetUser(userAuth?.userInfo.uid as string);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUserAuth({ isLoggedIn: true, userInfo: user });
        // console.log("This is the user: ", user);
      } else {
        setUserAuth(null);
        // console.log("There is no logged in user");
      }
    });
  }, []);

  return (
    <UserProvider value={{ userAuth, userProfile }}>{children}</UserProvider>
  );
}
