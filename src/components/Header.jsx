import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import { useEffect } from "react";

export default function Header() {
  const links = [
    {
      to: "/host",
      label: "Host",
    },
    {
      to: "/about",
      label: "About",
    },
    {
      to: "/vans",
      label: "Vans",
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
