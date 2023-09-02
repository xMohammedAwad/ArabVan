import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

export default function Header() {
  const links = [
    {
      to: "/host",
      children: "Host",
    },
    {
      to: "/about",
      children: "About",
    },
    {
      to: "/vans",
      children: "Vans",
    },
  ];

  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        <Navigation links={links} />

        <Link to="login" className="login-link">
          <img src="/assets/images/avatar-icon.png" className="login-icon" />
        </Link>
      </nav>
    </header>
  );
}
