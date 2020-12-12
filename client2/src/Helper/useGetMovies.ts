import { useSelector } from "react-redux";
import { IAppState } from "../store";

export default function useGetMovies() {
  const likedMovieIds:
    | Array<{ id: string; movieId: number }>
    | [] = useSelector(
    (state: IAppState) => state.firestore.ordered.LikedMovieId
  );
  const disLikedMovieIds:
    | Array<{ id: string; movieId: number }>
    | [] = useSelector(
    (state: IAppState) => state.firestore.ordered.DisLikedMovieId
  );
}
