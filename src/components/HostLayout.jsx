import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function HostLayout() {
  const links = [
    { to: ".", end: true, label: "Dashboard" },
    { to: "income", label: "income" },
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
