import { isRejectedWithValue } from "@reduxjs/toolkit";
import { resetStore } from "features";
import { clearCache } from "services";
import toast from "react-hot-toast";
// handle general API request errors
export const RequestErrorHandler = (store) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const { status, originalStatus } = action.payload;
    if (originalStatus) {
      switch (originalStatus) {
        case 400:
          toast.error("An error occured. Please contact support");
          break;
        case 401:
          toast.error(
            "Sorry you are not authorized to use this service. Please contact support"
          );
          // reset store/logout
          store.dispatch(resetStore());
          // clear local cache if any
          clearCache();
          break;
        case 403:
          toast.error("");
          break;
        case 404:
          toast.error(
            "Sorry the resource you requested is unavailable or not accessible"
          );
          break;
        case 409:
          toast.error(
            "There is a possible duplicate of this account please contact support"
          );
          break;
        case 429:
          toast.error(
            "Too many failed attempts please wait a while and try again"
          );
          break;
        case 500:
          toast.error("A critical error occured. Please contact support");
          break;
        default:
          toast.error("An error occured, please try again");
      }
    } else if (status === "FETCH_ERROR") {
      toast.error("An error occured, please check your network and try again");
    }
  }
  return next(action);
};
