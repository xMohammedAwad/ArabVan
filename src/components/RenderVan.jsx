import { memo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import BackButton from "./BackButton";

function RenderVan({ data, vanId }) {
  const location = useLocation();
  const links = [
    { to: ".", end: true, label: "Details" },
    { to: "reviews",state: location.state, label: "reviews" },
  ];

  return (
    <section>
      <BackButton />
      <nav className="van-detail-nav">
        <Navigation links={links} />
      </nav>
      <Outlet context={{ data, vanId, state: location.state }} />
    </section>
  );
}

export default memo(RenderVan);
