import { useCallback, useEffect, useState } from "react";

export function useAsync(asyncFunction, immediate = true, ...args) {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async () => {
    setValue(null);
    setError(null);
    setLoading(true);

    try {
      const response = await asyncFunction(...args);
      setValue(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [asyncFunction, ...args]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]);

  return { execute, loading, value, error };
}
