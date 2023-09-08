import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import { app } from "../firebase";
import { useAsync } from "./useAsync";

export function useLoginForm(label) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const apiMethod =
    label === "Login"
      ? signInWithEmailAndPassword
      : createUserWithEmailAndPassword;

  const location = useLocation();
  const from = location.state?.from || "/host";
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleLoginSuccess = useCallback(() => {
    if (localStorage.getItem("loggedin")) {
      return;
    }
    localStorage.setItem("loggedin", true);
    navigate(from, { replace: true });
  }, [localStorage]);

  const handleLoginError = useCallback((err) => {
    console.log("this error from handleLoginError", err);
  }, []);

  const handleSignOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("loggedin");
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  }, [auth, localStorage]);

  const { execute, status, error } = useAsync(
    () => apiMethod(auth, formData.email, formData.password),
    false
  ); // do not run immediately

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      execute().then(handleLoginSuccess).catch(handleLoginError);
    },
    [execute, handleLoginSuccess, handleLoginError]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        handleLoginSuccess();
      }
    });

    return () => unsubscribe();
  }, [auth, handleLoginSuccess]);

  return {
    formData,
    status,
    error,
    handleSubmit,
    handleChange,
    handleSignOut,
    location,
  };
}
