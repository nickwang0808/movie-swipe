import React, { useEffect, useState } from "react";
import { MovieDetail } from "./APICalls/searchMovieByID";
import useGetAllMatches, { IMatches } from "./db-operations/useGetAllMatches";
import useGetLikedMovies from "./db-operations/useGetLikedMovies";
import useGetMovies, { Result } from "./db-operations/useGetMovies";
import useGetUser, { IUserProfile } from "./db-operations/useGetUser";
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
  userProfile: IUserProfile | undefined;
  likedMoviesInfos: MovieDetail[];
  movieListInDeck: Result[] | undefined;
  isLoading: boolean;
  handleNext: () => void;
  size: ISize;
  matches: IMatches[] | undefined;
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
  const { likedMoviesInfos, likedMovieIds } = useGetLikedMovies(
    userAuth?.userInfo.uid as string
  );
  const { movieListInDeck, handleNext } = useGetMovies(
    userAuth?.userInfo?.uid as string
  );

  const matches = useGetAllMatches(
    userAuth?.userInfo.uid,
    likedMovieIds,
    userProfile?.friendsIdOnly
  );

  const [isLoading, setIsLoading] = useState(true);
  const size = useGetWIndowsSizing();

  useEffect(() => {
    if (userAuth !== undefined && movieListInDeck) setIsLoading(false);
  }, [movieListInDeck, userAuth]);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // console.log("user", user);
        setUserAuth({ isLoggedIn: true, userInfo: user });
      } else {
        // null is for no user logged in
        setUserAuth(null);
        setIsLoading(false);
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
        matches,
      }}
    >
      {children}
    </UserProvider>
  );
}
