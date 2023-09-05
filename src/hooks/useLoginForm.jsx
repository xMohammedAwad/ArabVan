import { useCallback, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import { app } from "../api";
import { useLocation, useNavigate } from "react-router-dom";

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

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const handleLoginSuccess = useCallback(() => {
    localStorage.setItem("loggedin", true);
    navigate(from, { replace: true });
    setStatus("idle");
  }, [localStorage]);

  const handleLoginError = useCallback((err) => {
    setError(err);
    setStatus("idle");
  }, []);

  const handleSignOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        localStorage.removeItem("loggedin");
        navigate("/login");
        setStatus("idle");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  }, [auth, localStorage]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setStatus("submitting");
      apiMethod(auth, formData.email, formData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          handleLoginSuccess();
          console.log(userCredential);
        })
        .catch((err) => {
          handleLoginError(err);
        })
        .finally(() => {
          console.log(formData.email);
        });
    },
    [auth, formData, apiMethod, handleLoginSuccess, handleLoginError]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [formData]
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in");
        handleLoginSuccess();
      } else {
        console.log("User is signed out");
        handleSignOut();
      }
    });
  }, [auth, handleLoginSuccess, handleSignOut]);

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
