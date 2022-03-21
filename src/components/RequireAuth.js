import React from "react";
import { useCookies } from "react-cookie";
import { useLocation, Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const cookieName = "SWOB-DEV-FE";
  const [cookies] = useCookies([cookieName]);

  return cookies[cookieName] ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};
