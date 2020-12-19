import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchVidActorProvider from "../../Helper/fetchVidActorProvider";
import { IMovieDetailsForDetailsExtended } from "../../MovieTypes/IDetialsScreen";
import { IAppState } from "../../store";

export const fetchDetailsThunk = createAsyncThunk<
  IMovieDetailsForDetailsExtended,
  undefined,
  {
    state: IAppState;
  }
>(
  "/details/fetchDetails",
  async (_, { getState }) => {
    console.log("fetchDetails");
    const movieId = getState().detailsState.movieToShow as number;
    const result = (await fetchVidActorProvider(
      movieId
    )) as IMovieDetailsForDetailsExtended;

    return result;
  },
  {
    condition: (_, { getState }) => {
      const { movieInfo, movieToShow } = getState().detailsState;
      const { id } = getState().movieList.movieList[0];
      if (!movieToShow) return false;
      if (movieToShow === id) return false;
      if (movieInfo && movieInfo.id === movieToShow) return false;
    },
  }
);
