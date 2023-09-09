import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";

export default function withFetchData(WrappedComponent, fetchData) {
  return function (props) {
    const { id } = useParams();
    const fetchCallback = useCallback(() => fetchData(id), [id]);
    const { value, status, error } = useAsync(fetchCallback);

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
