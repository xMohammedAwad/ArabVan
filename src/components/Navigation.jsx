import { NavLink } from "react-router-dom";

export default function Navigation({ links }) {
  const activeStyles = {
    fontWeight: "bold",
    color: "#e93f33",
  };

  return links.map((link, i) => (
    <NavLink
      className="header-nav-link"
      key={i}
      to={link.to}
      state={link.state}
      end={link.end}
      style={({ isActive }) => (isActive ? activeStyles : null)}
    >
      {link.label}
    </NavLink>
  ));
}
