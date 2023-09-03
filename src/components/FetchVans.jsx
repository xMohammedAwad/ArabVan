import React from "react";
import useFetchData from "../hooks/useFetchData";
import { getVans } from "../api";
import RenderVans from "./RenderVans";

export default function FetchVans({ typeFilter, searchParams }) {
  const { data: vans, loading, error } = useFetchData(getVans);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }
  return (
    <RenderVans
      typeFilter={typeFilter}
      searchParams={searchParams}
      vans={vans}
    />
  );
}
