import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="site-wrapper">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
