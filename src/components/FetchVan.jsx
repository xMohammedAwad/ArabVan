import React from "react";
import useFetchData from "../hooks/useFetchData";
import { getVan } from "../api";
import { useParams } from "react-router-dom";
import RenderVan from "./RenderVan";

export default function FetchVan() {
  const { id } = useParams();

  const { data: van, loading, error } = useFetchData(() => getVan(id));

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }
  return (
    <RenderVan van={van}/>
  );
}
