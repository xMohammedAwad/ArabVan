import AuthRequired from "./components/AuthRequired";
import HostLayout from "./components/HostLayout";
import Layout from "./components/Layout";
import About from "./pages/About";
import Home from "./pages/Home";
import Dashboard from "./pages/Host/Dashboard";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import HostVanPricing from "./pages/Host/HostVanPricing";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import VanDetail from "./pages/Vans/VanDetail";
import Vans from "./pages/Vans/Vans";
import HostVanDetail from "./pages/host/HostVanDetail";
import HostVans from "./pages/host/HostVans";

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
