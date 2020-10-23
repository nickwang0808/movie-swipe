import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase/config";

interface IUser {
  isLoggedIn: boolean;
  userInfo: firebase.User | null;
}

export const UserContext = React.createContext({} as IUser | undefined);
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser>();

  const defaultUser = { isLoggedIn: false, userInfo: null };

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUser({ isLoggedIn: true, userInfo: user });
        console.log("This is the user: ", user);
      } else {
        setUser(defaultUser);
        console.log("There is no logged in user");
      }
    });
  }, []);

  return <UserProvider value={user}>{children}</UserProvider>;
}
