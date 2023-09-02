import { NavLink } from "react-router-dom";

export default function Navigation({ links }) {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return links.map((link) => (
    <NavLink
      to={link.to}
      end={link.end}
      style={({ isActive }) => (isActive ? activeStyles : null)}
    >
      {link.children}
    </NavLink>
  ));
}
