import React from "react";
import handleWatched from "../../../db-operations/handleWatched";
import { IUserInfo } from "../../../db-operations/useGetAllMatches";
interface IWatchedWithWho {
  uid: string;
  movieId: number;
  matches: IUserInfo[] | undefined;
}

export default function WatchedWithWho({
  matches,
  movieId,
  uid,
}: IWatchedWithWho) {
  return (
    <>
      <h1>Who did you watch with?</h1>
      <button
        onClick={() =>
          handleWatched(uid, movieId, matches?.map((e) => e.uid) as string[])
        }
      >
        Submit
      </button>
    </>
  );
}
