import React, { useEffect, useState } from "react";
import useGetLikedMovies, {
  MovieDetail,
} from "./db-operations/useGetLikedMovies";
import useGetMovies, { IPopularMovies } from "./db-operations/useGetMovies";
import useGetUser from "./db-operations/useGetUser";
import { auth } from "./firebase/config";

interface IUser {
  isLoggedIn: boolean;
  userInfo: firebase.User;
}

interface IStore {
  userAuth: IUser | null;
  userProfile: any;
  likedMoviesInfos: MovieDetail[];
  movieList: IPopularMovies | undefined;
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
  const likedMoviesInfos = useGetLikedMovies(userAuth?.userInfo.uid as string);
  const { movieList } = useGetMovies(userAuth?.userInfo?.uid as string);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUserAuth({ isLoggedIn: true, userInfo: user });
      } else {
        setUserAuth(null);
      }
    });
  }, []);

  return (
    <UserProvider
      value={{ userAuth, userProfile, likedMoviesInfos, movieList }}
    >
      {children}
    </UserProvider>
  );
}
