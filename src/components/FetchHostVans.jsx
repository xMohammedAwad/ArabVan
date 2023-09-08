import React from "react";
import { getHostVans } from "../api";
import RenderHostVans from "./RenderHostVans";
import { useAsync } from "../hooks/useAsync";

export default function FetchHostVans() {
  const { value: vans, status, error } = useAsync(getHostVans);

  if (vans === null || vans === undefined) {
    return null;
  }

  if (status === "pending") {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }
  return <RenderHostVans vans={vans} />;
}
