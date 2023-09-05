import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useRedirectOnLogin(status) {
  const location = useLocation();
  const from = location.state?.from || "/host";
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loggedin")) {
      navigate(from, { replace: true });
    }
  }, [localStorage.getItem("loggedin"), from]);

  return location;
}
