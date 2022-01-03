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
