import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const links = [
    {
      to: "/host",
      label: "Host",
    },
    {
      to: "/vans",
      label: "Vans",
    },
  ];

  const { handleSignOut } = useAuth();
  return (
    <header>
      <Link className="site-logo" to="/">
        <img className="logo-img" src="/assets/images/logo.png" alt="" />
      </Link>
      <nav>
        <Navigation links={links} />

        {localStorage.getItem("loggedin") ? (
          <button onClick={() => handleSignOut()}>logOut</button>
        ) : (
          <Link to="login">
            <button className="login-btn">logIn</button>
          </Link>
        )}
      </nav>
    </header>
  );
}
