import React, { useEffect } from "react";
import { getVans } from "../api";
import RenderVans from "./RenderVans";
import { useAsync } from "../hooks/useAsync";

export default function FetchVans({ typeFilter }) {
  const { value: vans, status, error } = useAsync(getVans);

  if (vans === null || vans === undefined) {
    return null; 
  }
  if (status === "pending") {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  return <RenderVans typeFilter={typeFilter} vans={vans} />;
}
