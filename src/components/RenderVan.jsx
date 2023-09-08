import { memo } from "react";
import { Link } from "react-router-dom";

function RenderVan({ van, vanId }) {
  return (
    <>
      {van && (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <Link to={`/checkout?vanId=${vanId}&hostId=${van.hostId}`} className="link-button">
            <button className="link-button">Rent this van</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default memo(RenderVan);
