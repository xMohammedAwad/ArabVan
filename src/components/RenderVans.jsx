import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function RenderVans({ vans, typeFilter }) {
  const displayedVans = useMemo(() => {
    return typeFilter ? vans.filter((van) => van.type === typeFilter) : vans;
  }, [vans, typeFilter]);
  
  return displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={van.id}
        state={{ type: typeFilter, search: `type=${typeFilter}` }}
      >
        <img src={van.imageUrl} alt={van.name} />
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
  ));
}
