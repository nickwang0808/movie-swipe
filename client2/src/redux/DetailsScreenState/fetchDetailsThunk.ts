import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchVidActorProvider from "../../Helper/fetchVidActorProvider";
import { IMovieDetailsForDetailsScreen } from "../../MovieTypes/IDetialsScreen";
import { IAppState } from "../../store";

export const fetchDetailsThunk = createAsyncThunk<
  IMovieDetailsForDetailsScreen,
  undefined,
  {
    state: IAppState;
  }
>(
  "/details/fetchDetails",
  async (_, { getState }) => {
    const movieId = getState().detailsState.movieToShow as number;
    const result = (await fetchVidActorProvider(
      movieId
    )) as IMovieDetailsForDetailsScreen;

    return result;
  },
  {
    condition: (_, { getState }) => {
      const { movieInfo, movieToShow } = getState().detailsState;
      if (!movieToShow) return false;
      if (movieInfo && movieInfo.id === movieToShow) return false;
    },
  }
);
