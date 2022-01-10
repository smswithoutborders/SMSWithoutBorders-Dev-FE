// user management
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  sessionID: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveAuth: (state, action) => {
      const { id, email, session_id } = action.payload;
      return {
        ...state,
        id,
        email,
        sessionID: session_id,
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

export default authSlice.reducer;
