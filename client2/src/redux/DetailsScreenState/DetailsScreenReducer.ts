import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovieDetailsForDetailsScreen } from "../../MovieTypes/IDetialsScreen";
import { fetchDetailsThunk } from "./fetchDetailsThunk";
interface IState {
  movieToShow: number | null;
  movieInfo: IMovieDetailsForDetailsScreen | null;
  loading: boolean;
  error: string | null;
}

const initialState: IState = {
  movieInfo: null,
  movieToShow: null,
  loading: false,
  error: null,
};

const MovieDetailsReducer = createSlice({
  name: "details",
  initialState,
  reducers: {
    setModalToShow: (state, action: PayloadAction<number | null>) => {
      state.movieToShow = action.payload;
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

export const { setModalToShow } = MovieDetailsReducer.actions;
export default MovieDetailsReducer.reducer;
