import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function Auth() {
  const auth = false;
  if (!auth) {
    return <Navigate to="/login" state={{ message: "you must login first" }} />;
  }

  return <Outlet />;
}
