import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const { isAuth } = useSelector((store) => store.auth);
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default RequireAuth;
