import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  isLoaded: boolean;
  authenticated: boolean;
  error: string | null;
  user: {};
}

const initialState: IAuthState = {
  isLoaded: false,
  authenticated: false,
  error: null,
  user: {},
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userSignedIn: (state, action) => {
      state.isLoaded = true;
      state.authenticated = true;
      state.user = action.payload;
    },
    userNotSigned: (state) => {
      state.isLoaded = true;
    },
  },
});

export const { userNotSigned, userSignedIn } = userSlice.actions;
export default userSlice.reducer;
