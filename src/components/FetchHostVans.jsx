import React from "react";
import useFetchData from "../hooks/useFetchData";
import { getHostVans } from "../api";
import RenderHostVans from "./RenderHostVans";

export default function FetchHostVans() {
  const { data: vans, loading, error } = useFetchData(getHostVans);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }
  return <RenderHostVans vans={vans} />;
}
