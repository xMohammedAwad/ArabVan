import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useRedirectOnLogin(status) {
  const location = useLocation();
  const from = location.state?.from || "/host";
  const navigate = useNavigate();

    if (localStorage.getItem("loggedin")) {
      navigate(from, { replace: true });
    }

  return location;
}
