import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

import "../pages/Host/HostVans/HostVans.css";

export default function HostLayout() {
  const links = [
    { to: ".", end: true, label: "Dashboard" },
    { to: "vans", label: "vans" },
    { to: "reviews", label: "reviews" },
  ];
  return (
    <>
      <nav className="host-nav">
        <Navigation links={links} />
      </nav>
      <Outlet />
    </>
  );
}
