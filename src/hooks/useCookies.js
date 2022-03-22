import { useState } from "react";
import Cookies from "js-cookie";

export const useCookies = () => {
  const cookieName = process.env.REACT_APP_COOKIE_NAME;
  const sessionDuration = Number(process.env.REACT_APP_SESSION_DURATION);
  const [cookies, updateCookie] = useState(() => {
    return Cookies.get(cookieName) ? true : false;
  });

  function setCookie(value) {
    Cookies.set(cookieName, value, {
      expires: Date.now() + sessionDuration,
    });
    // check and update cookie state
    updateCookie(() => (Cookies.get(cookieName) ? true : false));
  }

  function removeCookie() {
    Cookies.remove(cookieName);
  }

  return { cookies, setCookie, removeCookie };
};
