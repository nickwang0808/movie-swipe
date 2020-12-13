import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  isLoaded: boolean;
  authenticated: boolean;
  error: string | null;
  user: IUserAuth | null;
}

export interface IUserAuth {
  displayName: string | null;
  email: string | null;
  isAnonymous: boolean;
  photoURL: null | string;
  uid: string;
}

const initialState: IAuthState = {
  isLoaded: false,
  authenticated: false,
  error: null,
  user: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userSignedIn: (state, action: PayloadAction<IUserAuth>) => {
      state.isLoaded = true;
      state.authenticated = true;
      state.user = action.payload;
    },
    userNotSigned: (state) => {
      state.isLoaded = true;
    },
    signInError: (state, action: PayloadAction<string>) => {
      state.isLoaded = true;
      state.error = action.payload;
    },
  },
});

export const { userNotSigned, userSignedIn, signInError } = userSlice.actions;
export default userSlice.reducer;
