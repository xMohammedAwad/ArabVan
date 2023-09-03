import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function BackButton() {
  const location = useLocation();

  const search = location.state?.search || "";
  const type = location.state?.type || "all";
  return (
    <Link to={`..?${search}`} relative="path" className="back-button">
      &larr; <span>Back to {type} vans</span>
    </Link>
  );
}
