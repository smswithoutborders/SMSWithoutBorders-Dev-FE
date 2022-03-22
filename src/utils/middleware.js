import { isRejectedWithValue } from "@reduxjs/toolkit";
import { resetStore } from "features";
import { clearCache } from "services";
import toast from "react-hot-toast";

// middleware to check for user session expiry
export const sessionExpiryChecker = (store) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const { originalStatus } = action.payload;
    if (originalStatus === 401) {
      // reset store/logout
      store.dispatch(resetStore());
      // clear local cache if any
      clearCache();
    }
  }
  return next(action);
};

// handle general API request errors
export const RequestErrorHandler = (store) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const { originalStatus } = action.payload;
    if (originalStatus === 404) {
      toast.error(
        "Sorry the resource you requested is unavailable or not accessible"
      );
    }
  }
  return next(action);
};
