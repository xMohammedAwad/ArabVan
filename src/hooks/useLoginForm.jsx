import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export function useLoginForm() {
  const location = useLocation();
  const from = location.state?.from || "/host";

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setStatus("submitting");
      loginUser(loginFormData)
        .then((data) => {
          setError(null);
          localStorage.setItem("loggedin", true);
          navigate(from, { replace: true });
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setStatus("idle");
        });
    },
    [loginFormData, from, navigate]
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
    handleSubmit,
    handleChange,
    location,
  };
}
