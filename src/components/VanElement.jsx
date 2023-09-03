import { Link } from "react-router-dom";

export default function VanElement({ van, typeFilter, searchParams }) {
  return (
    <div className="van-tile">
      <Link
        to={van.id}
        state={{
          search: `?${searchParams.toString()}`,
          type: typeFilter,
        }}
      >
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  );
}
