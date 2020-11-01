import React, { useEffect, useLayoutEffect, useState } from "react";
import { MovieDetail } from "./APICalls/searchMovieByID";
import useGetLikedMovies from "./db-operations/useGetLikedMovies";
import useGetMovies, { Result } from "./db-operations/useGetMovies";
import useGetUser from "./db-operations/useGetUser";
import { auth } from "./firebase/config";
import useGetWIndowsSizing, {
  ISize,
} from "./HelperFunctions/useGetWIndowsSizing";

interface IUser {
  isLoggedIn: boolean;
  userInfo: firebase.User;
}

interface IStore {
  userAuth: IUser | null;
  userProfile: any;
  likedMoviesInfos: MovieDetail[];
  movieListInDeck: Result[] | undefined;
  isLoading: boolean;
  handleNext: () => void;
  size: ISize;
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
  const { movieListInDeck, handleNext } = useGetMovies(
    userAuth?.userInfo?.uid as string
  );
  const [isLoading, setIsLoading] = useState(true);
  const size = useGetWIndowsSizing();

  useEffect(() => {
    if (movieListInDeck) {
      setIsLoading(false);
    }
  }, [movieListInDeck]);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // console.log("user", user);
        setUserAuth({ isLoggedIn: true, userInfo: user });
      } else {
        setUserAuth(null);
      }
    });
  }, []);

  return (
    <UserProvider
      value={{
        isLoading,
        userAuth,
        userProfile,
        likedMoviesInfos,
        movieListInDeck,
        handleNext,
        size,
      }}
    >
      {children}
    </UserProvider>
  );
}
