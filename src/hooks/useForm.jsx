import { useState, useCallback } from "react";

export function useForm(initialFormData) {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  return { formData, handleChange };
}
