import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

export function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setStatus("pending");
    setValue(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus("success");
    
    } catch (error) {
      setError(error);
      setStatus("error");
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
}
