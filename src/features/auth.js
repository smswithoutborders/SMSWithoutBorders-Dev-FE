// user management
import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveAuth: (state, action) => {
      const { uid, email } = action.payload;
      return {
        ...state,
        uid,
        email,
      };
    },
    clearAuth: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

// Action creators are generated for each reducer function
export const { saveAuth, clearAuth } = authSlice.actions;

// auth selector
export const authSelector = (state) => state.auth;

export const logout = createAction("LOG_OUT");

export default authSlice.reducer;
