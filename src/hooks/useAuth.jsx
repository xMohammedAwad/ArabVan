import { useAsync } from "./useAsync";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../firebase";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * A hook for handling authentication.
 *
 * @param {string} label - The label for the authentication action.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @return {Object} - An object containing the execute function, status, error, and handleSignOut function.
 */
export function useAuth(label, email, password, from) {
  const navigate = useNavigate();

  const auth = getAuth(app);
  const apiMethod =
    label === "Login"
      ? signInWithEmailAndPassword
      : createUserWithEmailAndPassword;

  const { execute, status, error } = useAsync(
    apiMethod,
    false,
    auth,
    email,
    password
  );

  const handleSignOut = useCallback(() => {
    signOut(auth).then(() => {
      localStorage.removeItem("loggedin");
      navigate("/login", { replace: true });
    });
  }, [auth, localStorage]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("loggedin", true);
        navigate(from, { replace: true });
      }
    });

    return () => unsubscribe();
  }, [auth, from]);

  return { execute, status, error, handleSignOut };
}
