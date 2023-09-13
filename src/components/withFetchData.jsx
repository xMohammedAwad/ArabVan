import React, { useCallback, useEffect } from "react";
import { useAsync } from "../hooks/useAsync";
import { useLocation } from "react-router-dom";
export default function withFetchData(WrappedComponent, fetchData) {
  return function (props) {
    const location = useLocation();
    const pathSegments = location.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1];
    const memoizedFetchData = useCallback(() => fetchData(id), [id]);
    const { value, status, error, execute } = useAsync(
      memoizedFetchData,
      false
    );

    useEffect(() => {
      execute();
    }, [location]); // re-run the effect if location changes

    if (value === null || value === undefined) {
      return null;
    }

    if (status === "pending") {
      return <h1>Loading...</h1>;
    }

    if (error) {
      return <h1>There was an error: {error.message}</h1>;
    }

    return <WrappedComponent data={value} {...props} />;
  };
}
