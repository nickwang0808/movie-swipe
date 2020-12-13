import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserAuth } from "../Auth/AuthReducer";

export interface IProfileDetails extends IUserAuth {
  genrePreference: number[];
}

interface IProfile {
  isLoaded: boolean;
  profile: IProfileDetails | null;
  error: string | null;
}

const initialState: IProfile = {
  isLoaded: false,
  profile: null,
  error: null,
};

const profileReducer = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<IProfileDetails>) => {
      state.isLoaded = true;
      state.profile = action.payload;
    },
    profileError: (state, action: PayloadAction<string>) => {
      state.isLoaded = true;
      state.error = action.payload;
    },
  },
});

export const { profileError, setProfile } = profileReducer.actions;
export default profileReducer.reducer;
