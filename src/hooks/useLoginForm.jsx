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
  let from = "";
  if (location.pathname.startsWith("/host")) {
    from = location.pathname;
  } else {
    from = location.state?.from || "/host";
  }

  const navigate = useNavigate();
  const auth = getAuth(app);

  const { execute, status, error } = useAsync(
    () => apiMethod(auth, formData.email, formData.password),
    false
  ); // do not run immediately

  const handleSignOut = useCallback(() => {
    signOut(auth).then(() => {
      localStorage.removeItem("loggedin");
      navigate("/login", { replace: true });
    });
  }, [auth, localStorage]);

  const handleSubmit = useCallback(
    (e) => {
      if (formData.email == "muhmmad.awd@gmail.com") {
        localStorage.setItem("role", "host");
      } else {
        localStorage.setItem("role", "user");
      }
      e.preventDefault();
      execute();
    },
    [execute]
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
        localStorage.setItem("loggedin", true);
        navigate(from, { replace: true });
      }
    });

    return () => unsubscribe();
  }, [auth, from]);

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
