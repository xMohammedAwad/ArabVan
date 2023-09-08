import React, { useCallback } from "react";
import { getVan } from "../api";
import { useParams } from "react-router-dom";
import RenderHostVan from "./RenderHostVan";
import { useAsync } from "../hooks/useAsync";

export default function FetchHostVan() {
  const { id } = useParams();

  const fetchVan = useCallback(() => getVan(id), [id]);

  const { value: currentVan, status, error } = useAsync(fetchVan);

  if (currentVan === null || currentVan === undefined) {
    return null;
  }

  if (status === "pending") {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }
  if (currentVan) {
    return <RenderHostVan currentVan={currentVan} />;
  }
}
