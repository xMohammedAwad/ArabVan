import React, { useCallback, useEffect } from "react";
import { useAsync } from "../hooks/useAsync";
import { useLocation, useParams } from "react-router-dom";


export default function withFetchData(WrappedComponent, fetchData) {
  return function (props) {
    const location = useLocation();
    const id = useParams().id;
    const memoizedFetchData = useCallback(() => fetchData(id), [id]);
    const { value, loading, error, execute } = useAsync(
      memoizedFetchData,
      false
    );

    useEffect(() => {
      if (!loading) {
        execute();
      }
    }, [location]); // re-run the effect if location or loading changes

    if (value === null || value === undefined) {
      return null;
    }

    if (error) {
      return <h1>There was an error: {error.message}</h1>;
    }

    return <WrappedComponent data={value} vanId={id} {...props} />;
  };
}
