import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchVidActorProvider from "../../Helper/fetchVidActorProvider";
import { IExtendedMovieDetails } from "../../MovieTypes/ExtendedMovieDetails";
import { IAppState } from "../../store";

interface mediaToFind {
  id: number;
  type: "tv" | "movie";
}

export const fetchDetailsThunk = createAsyncThunk<
  IExtendedMovieDetails,
  mediaToFind,
  {
    state: IAppState;
  }
>(
  "/details/fetchDetails",
  async ({ id, type }) => {
    console.log("fetchDetails");
    const result = (await fetchVidActorProvider(
      id,
      type
    )) as IExtendedMovieDetails;

    return result;
  },
  {
    condition: (mediaToFind, { getState }) => {
      const { movieInfo, movieToShow } = getState().detailsState;
      const { id } = getState().movieList.movieList[0];
      if (!movieToShow) return false;
      if (movieToShow === id) return false;
      if (movieInfo && movieInfo.id === movieToShow) return false;
    },
  }
);
