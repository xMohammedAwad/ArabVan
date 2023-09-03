import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function HostLayout() {
  const links = [
    { to: ".", end: true, children: "Dashboard" },
    { to: "income", children: "income" },
    { to: "vans", children: "vans" },
    { to: "reviews", children: "reviews" },
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
