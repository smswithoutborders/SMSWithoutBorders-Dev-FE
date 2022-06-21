// contains all store reducers
import { combineReducers } from "@reduxjs/toolkit";
import { API } from "../services/api";
import authReducer, { logout } from "./auth";
import credsReducer from "./credentials";

// Add the generated reducer as a specific top-level reducer
const appReducer = combineReducers({
  auth: authReducer,
  credentials: credsReducer,
  [API.reducerPath]: API.reducer,
});

/*
 adding condition to reset all store state
 check store.js for action Creator definition
 https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store?page=1&tab=votes#tab-top
*/
const rootReducer = (state, action) => {
  if (logout.match(action)) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
