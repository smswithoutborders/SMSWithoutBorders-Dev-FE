// user management
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authedUser: "",
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        uid: action.payload,
      };
    },
    logout: (state) => {
      return {
        ...state,
        uid: "",
      };
    },
  },
});

// Action creators are generated for each reducer function
export const { login, logout } = authSlice.actions;

// auth selector
export const authSelector = (state) => state.auth.auth_key;

export default authSlice.reducer;
