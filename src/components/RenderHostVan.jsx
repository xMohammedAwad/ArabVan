import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { memo } from "react";

function RenderHostVan({ data }) {
  const links = [
    { to: ".", end: true, label: "Details" },
    { to: "pricing", label: "Pricing" },
    { to: "photos", label: "Photos" },
  ];
  return (
    <>
      {data && (
        <div className="host-van-detail-layout-container">
          <div className="host-van-detail">
            <img src={data.imageUrl} />
            <div className="host-van-detail-info-text">
              <i className={`van-type van-type-${data.type}`}>{data.type}</i>
              <h3>{data.name}</h3>
              <h4>${data.price}/day</h4>
            </div>
          </div>
          <nav className="host-van-detail-nav">
            <Navigation links={links} />
          </nav>
          <Outlet context={{ data }} />
        </div>
      )}
    </>
  );
}
export default memo(RenderHostVan);
