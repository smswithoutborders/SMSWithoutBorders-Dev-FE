import { configureStore, createAction } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { API } from "../services/api";
import { sessionExpiryChecker, RequestErrorHandler } from "utils";
import rootReducer from "./reducers";

export const resetStore = createAction("RESET_STORE");

export const store = configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      API.middleware,
      sessionExpiryChecker,
      RequestErrorHandler
    ),
  devTools: process.env.NODE_ENV !== "production" ? true : false,
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
