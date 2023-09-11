import { useState, useEffect } from "react";

export function useRole() {
  const [role, setRole] = useState(localStorage.getItem("role"));

  // Update role in state when it changes in localStorage
  useEffect(() => {
    const updateRole = () => {
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", updateRole);

    return () => {
      window.removeEventListener("storage", updateRole);
    };
  }, []);

  return role;
}
