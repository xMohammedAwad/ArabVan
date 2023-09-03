import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function RenderHostVan({ currentVan }) {
  const links = [
    { to: ".", end: true, label: "Details" },
    { to: "pricing", label: "Pricing" },
    { to: "photos", label: "Photos" },
  ];

  return (
    <>
      {currentVan && (
        <div className="host-van-detail-layout-container">
          <div className="host-van-detail">
            <img src={currentVan.imageUrl} />
            <div className="host-van-detail-info-text">
              <i className={`van-type van-type-${currentVan.type}`}>
                {currentVan.type}
              </i>
              <h3>{currentVan.name}</h3>
              <h4>${currentVan.price}/day</h4>
            </div>
          </div>
          <nav className="host-van-detail-nav">
            <Navigation links={links} />
          </nav>
          <Outlet context={{ currentVan }} />
        </div>
      )}
    </>
  );
}
