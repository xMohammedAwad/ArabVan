import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function BackButton() {
  const location = useLocation();
  console.log(location.pathname.split("/").includes("reviews"));
  const search = location.state?.type ? location.state?.search : "";
  const type = location.state?.type || "all";
  const to = location.pathname.split("/").includes("reviews")
    ? `../..?${search}`
    : `..?${search}`;

  return (
    <Link to={to} relative="path" className="back-button">
      &larr; <span>Back to {type} vans</span>
    </Link>
  );
}
