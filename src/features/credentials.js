// user management
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authID: "",
  authKey: "",
};

export const credsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    saveCredentials: (state, action) => {
      const { auth_key, auth_id } = action.payload;
      return {
        ...state,
        authID: auth_id,
        authKey: auth_key,
      };
    },
    clearCredentials: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

// Action creators are generated for each reducer function
export const { saveCredentials, clearCredentials } = credsSlice.actions;

// auth selector
export const credentialsSelector = (state) => state.credentials;

export default credsSlice.reducer;
