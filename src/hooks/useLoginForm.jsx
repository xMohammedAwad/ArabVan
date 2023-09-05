import { useCallback, useState } from "react";
import { loginUser } from "../api";
import useRedirectOnLogin from "./useRedirectOnLogin";

export function useLoginForm() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const location = useRedirectOnLogin();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const handleLoginSuccess = () => {
    localStorage.setItem("loggedin", true);
    setStatus("idle");
  };

  const handleLoginError = (err) => {
    setError(err);
    setStatus("idle");
  };

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      setStatus("submitting");
      loginUser(loginFormData)
        .then((data) => {
          handleLoginSuccess();
        })
        .catch((err) => {
          handleLoginError(err);
        });
    },
    [loginFormData]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  return {
    loginFormData,
    status,
    error,
    handleLogin,
    handleChange,
    location,
  };
}
