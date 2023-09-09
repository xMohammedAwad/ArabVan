import { memo } from "react";
import { Link } from "react-router-dom";

function RenderVan({ data, vanId }) {
  return (
    <>
      {data && (
        <div className="van-detail">
          <img src={data.imageUrl} />
          <i className={`van-type ${data.type} selected`}>{data.type}</i>
          <h2>{data.name}</h2>
          <p className="van-price">
            <span>${data.price}</span>/day
          </p>
          <p>{data.description}</p>
          <Link
            to={`/checkout?vanId=${vanId}&hostId=${data.hostId}`}
            className="link-button"
          >
            <button className="link-button">Rent this van</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default memo(RenderVan);
