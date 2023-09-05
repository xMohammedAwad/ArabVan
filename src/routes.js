import AuthRequired from "./components/AuthRequired";
import HostLayout from "./components/HostLayout";
import Layout from "./components/Layout";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import HostVanDetail from "./pages/Host/HostVanDetail/HostVanDetail";
import HostVans from "./pages/Host/HostVans/HostVans";
import Dashboard from "./pages/Host/Dashboard/Dashboard";
import Income from "./pages/Host/Income/Income";
import Reviews from "./pages/Host/Reviews/Reviews";
import HostVanPhotos from "./pages/Host/HostVanPhotos/HostVanPhotos";
import HostVanPricing from "./pages/Host/HostVanPricing/HostVanPricing";
import HostVanInfo from "./pages/Host/HostVanInfo/HostVanInfo";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import VanDetail from "./pages/Vans/VanDetail/VanDetail";
import Vans from "./pages/Vans/Vans/Vans";
import Signup from "./pages/Signup/Signup";

const routes = [
  {
    path: "/",
    element: Layout,
    children: [
      { path: "", element: Home },
      { path: "about", element: About },
      { path: "vans", element: Vans },
      { path: "vans/:id", element: VanDetail },
      { path: "login", element: Login },
      { path: "signup", element: Signup },
      {
        path: "/host",
        element: AuthRequired,
        children: [
          {
            path: "",
            element: HostLayout,
            children: [
              { path: "", element: Dashboard },
              { path: "income", element: Income },
              { path: "reviews", element: Reviews },
              { path: "vans", element: HostVans },
              {
                path: "vans/:id",
                element: HostVanDetail,
                children: [
                  { path: "", element: HostVanInfo },
                  { path: "pricing", element: HostVanPricing },
                  { path: "photos", element: HostVanPhotos },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  { path: "*", element: NotFound },
];

export default routes;
