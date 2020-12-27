import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProfileDetails } from "../Profile/profileReducer";

interface IFriendsReducer {
  friends: IProfileDetails[] | null;
  received: IProfileDetails[] | null;
  sent: IProfileDetails[] | null;
}

const initialState: IFriendsReducer = {
  friends: null,
  received: null,
  sent: null,
};

const FriendsReducer = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<IProfileDetails[]>) => {
      state.friends = action.payload;
    },
    setReceived: (state, action: PayloadAction<IProfileDetails[]>) => {
      state.received = action.payload;
    },
    setSent: (state, action: PayloadAction<IProfileDetails[]>) => {
      state.sent = action.payload;
    },
  },
});

export const { setFriends, setReceived, setSent } = FriendsReducer.actions;
export default FriendsReducer.reducer;
