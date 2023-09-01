import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";

export default function VanDetail() {
  const { id } = useParams();
  const location = useLocation();

  const { data: van, loading, error } = useFetchData(`/api/vans/${id}`);

  const search = location.state?.search || "";
  const type = location.state?.type || "all";
  
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return (
      <h2>
        there is an Error: <br /> {error.message}
      </h2>
    );
  }
  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>

      {van && (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      )}
    </div>
  );
}
