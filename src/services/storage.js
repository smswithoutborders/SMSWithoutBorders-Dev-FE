// session and local storage management

export const setCache = (state) => {
  sessionStorage.setItem("SWOBDEV", JSON.stringify(state));
};

export const getCache = () => {
  return JSON.parse(sessionStorage.getItem("SWOBDEV"));
};

export const clearCache = () => {
  sessionStorage.removeItem("SWOBDEV");
};

/*
 used for persisting state with sessionStorage
 https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
*/
export const persistState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("SWOB-DEV-STORE", serializedState);
  } catch (err) {
    // do nothing with this error just catching for safety
  }
};

export const getPersistedState = () => {
  try {
    const serializedState = sessionStorage.getItem("SWOB-DEV-STORE");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const clearPersistedState = () => {
  sessionStorage.removeItem("SWOB-DEV-STORE");
};
