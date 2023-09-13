import { memo } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

function RenderVan({ data, vanId }) {
  const links = [
    { to: ".", end: true, label: "Details" },
    { to: "reviews", label: "reviews" },
  ];

  return (
    <section>
      <nav className="van-detail-nav">
        <Navigation links={links} />
      </nav>
      <Outlet context={{ data, vanId }} />
    </section>
  );
}

export default memo(RenderVan);
