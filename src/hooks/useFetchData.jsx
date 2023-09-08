import { useEffect, useState } from "react";

export default function useFetchData(fetchFunction) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function fetchData() {
      setLoading(true);
      try {
        const fetchData = await fetchFunction();
        setData(fetchData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchFunction]);

  return { data, loading, error };
}
