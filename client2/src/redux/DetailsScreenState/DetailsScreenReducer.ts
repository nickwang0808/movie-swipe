import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExtendedMovieDetails } from "../../MovieTypes/ExtendedMovieDetails";
import { fetchDetailsThunk } from "./fetchDetailsThunk";
interface IState {
  movieToShow: number | null;
  movieInfo: IExtendedMovieDetails | null;
  loading: boolean;
  error: string | null;
  trailerToShow: number | null;
}

const initialState: IState = {
  movieInfo: null,
  movieToShow: null,
  loading: false,
  error: null,
  trailerToShow: null,
};

const MovieDetailsReducer = createSlice({
  name: "details",
  initialState,
  reducers: {
    setModalToShow: (state, action: PayloadAction<number | null>) => {
      state.movieToShow = action.payload;
    },
    setTrailerToShow: (state, action: PayloadAction<number | null>) => {
      state.trailerToShow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDetailsThunk.fulfilled, (state, action) => {
      state.movieInfo = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchDetailsThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDetailsThunk.rejected, (state) => {
      state.loading = false;
      state.error = "NetWork Error, please reload or restart your app";
    });
  },
});

export const { setModalToShow, setTrailerToShow } = MovieDetailsReducer.actions;
export default MovieDetailsReducer.reducer;
