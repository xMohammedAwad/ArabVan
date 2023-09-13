import { Link, useOutletContext } from "react-router-dom";
import "./VanInfo.css";
export default function VanInfo() {
  const { data, vanId } = useOutletContext();

  return (
    <article>
      {data && (
        <div className="van-detail">
          <img src={data.imageUrl} />
          <div className="van-info">
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
        </div>
      )}
    </article>
  );
}
