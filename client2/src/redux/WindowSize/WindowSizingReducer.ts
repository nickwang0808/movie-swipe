import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWindowsSizingReducer {
  height: number;
  XCenter: number;
  width: number;
}

const initialState: IWindowsSizingReducer = {
  height: 823,
  width: 411,
  XCenter: 205.5,
};

const windowSizingSlice = createSlice({
  name: "windowSizing",
  initialState,
  reducers: {
    setWindowSizing: (state, action: PayloadAction<IWindowsSizingReducer>) => {
      state.height = action.payload.height;
      state.XCenter = action.payload.XCenter;
      state.width = action.payload.width;
    },
  },
});

export const { setWindowSizing } = windowSizingSlice.actions;
export default windowSizingSlice.reducer;
