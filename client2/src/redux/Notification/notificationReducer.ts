import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVotedMovies } from "../../MovieTypes";

interface INotification {
  notification: IVotedMovies | null;
}

const initialState: INotification = {
  notification: null,
};

const notificationReducer = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMatchModal: (state, action: PayloadAction<IVotedMovies | null>) => {
      state.notification = action.payload;
    },
  },
});

export const { setMatchModal: setNotification } = notificationReducer.actions;
export default notificationReducer.reducer;
