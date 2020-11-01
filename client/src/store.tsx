import React, { useEffect, useState } from "react";
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
  userAuth: IUser | undefined | null;
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
  const [userAuth, setUserAuth] = useState<IUser | null>(); // undefined is for loading
  const userProfile = useGetUser(userAuth?.userInfo.uid as string);
  const likedMoviesInfos = useGetLikedMovies(userAuth?.userInfo.uid as string);
  const { movieListInDeck, handleNext } = useGetMovies(
    userAuth?.userInfo?.uid as string
  );
  const [isLoading, setIsLoading] = useState(true);
  const size = useGetWIndowsSizing();

  useEffect(() => {
    if (movieListInDeck) setIsLoading(false);
    if (userAuth !== undefined) setIsLoading(false);
  }, [movieListInDeck, userAuth]);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // console.log("user", user);
        setUserAuth({ isLoggedIn: true, userInfo: user });
      } else {
        // null is for no user logged in
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
