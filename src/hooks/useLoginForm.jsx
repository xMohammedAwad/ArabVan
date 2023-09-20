import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "./useForm";
import { useAuth } from "./useAuth";
import { useCallback } from "react";

export function useLoginForm(label, initialFormData) {
  const location = useLocation();
  let from = location.state?.from || "/host";

  const { formData, handleChange } = useForm(initialFormData);
  const { execute, loading, error } = useAuth(
    label,
    formData.email,
    formData.password,
    from
  );

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      if (formData.email == "muhmmad.awd@gmail.com") {
        localStorage.setItem("role", "host");
      } else {
        localStorage.setItem("role", "user");
      }
      e.preventDefault();
      execute().then((res) => {
        navigate(from, { replace: true });
      });
    },
    [execute]
  );

  return {
    formData,
    loading,
    error,
    handleSubmit,
    handleChange,
    location,
  };
}
