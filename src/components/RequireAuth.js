import React from "react";
import { useCookies } from "hooks";
import { useLocation, Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { cookies } = useCookies();

  return cookies ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};
