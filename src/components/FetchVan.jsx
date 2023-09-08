import React, { useCallback } from "react";
import { getVan } from "../api";
import { useParams } from "react-router-dom";
import RenderVan from "./RenderVan";
import { useAsync } from "../hooks/useAsync";

export default function FetchVan() {
  const { id } = useParams();

  const fetchVan = useCallback(() => getVan(id), [id]);

  const { value: van, status, error } = useAsync(fetchVan);

  if (status === "pending") {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  if (van) {
    return <RenderVan van={van} vanId={id} />;
  }
}
