import { memo, useMemo } from "react";
import { Link } from "react-router-dom";

function RenderVans({ data, typeFilter }) {
  const displayedVans = useMemo(() => {
    return typeFilter ? data.filter((van) => van.type === typeFilter) : data;
  }, [data, typeFilter]);

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
      </Link>
      <span className={`vans-type van-type ${van.type} selected`}>{van.type}</span>
    </div>
  ));
}

export default memo(RenderVans);
