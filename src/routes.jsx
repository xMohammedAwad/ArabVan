import React, { lazy, Suspense } from "react";
import AuthRequired from "./components/AuthRequired";
import HostLayout from "./components/HostLayout";
import Layout from "./components/Layout";
import { useRole } from "./hooks/useRole";

const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Home = lazy(() => import("./pages/Home/Home"));
const VanReviews = lazy(() => import("./pages/Vans/VanReviews/VanReviews"));
const VanInfo = lazy(() => import("./pages/Vans/VanInfo/VanInfo"));
const HostVanDetail = lazy(() =>
  import("./pages/Host/HostVanDetail/HostVanDetail")
);
const HostVans = lazy(() => import("./pages/Host/HostVans/HostVans"));
const Dashboard = lazy(() => import("./pages/Host/Dashboard/Dashboard"));
const HostReviews = lazy(() => import("./pages/Host/HostReviews/HostReviews"));
const HostVanPhotos = lazy(() =>
  import("./pages/Host/HostVanPhotos/HostVanPhotos")
);
const HostVanPricing = lazy(() =>
  import("./pages/Host/HostVanPricing/HostVanPricing")
);
const HostVanInfo = lazy(() => import("./pages/Host/HostVanInfo/HostVanInfo"));
const Login = lazy(() => import("./pages/Login/Login"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const VanDetail = lazy(() => import("./pages/Vans/VanDetail/VanDetail"));
const Vans = lazy(() => import("./pages/Vans/Vans/Vans"));
const Signup = lazy(() => import("./pages/Signup/Signup"));

function RoleBasedComponent() {
  const role = useRole();
  return role === "host" ? <HostLayout /> : <Profile />;
}

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={null}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "vans",
        element: (
          <Suspense fallback={null}>
            <Vans />
          </Suspense>
        ),
      },
      {
        path: "vans/:id",
        element: (
          <Suspense fallback={null}>
            <VanDetail />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={null}>
                <VanInfo />
              </Suspense>
            ),
          },
          {
            path: "reviews",
            element: (
              <Suspense fallback={null}>
                <VanReviews />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "login",
        element: (
          <Suspense fallback={null}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={null}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "checkout",

        element: <AuthRequired />,
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={null}>
                <Checkout />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={null}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "/host",
        element: <AuthRequired />,
        children: [
          {
            path: "",
            element: <RoleBasedComponent />,
            children: [
              {
                path: "",
                element: (
                  <Suspense fallback={null}>
                    <Dashboard />
                  </Suspense>
                ),
              },
              {
                path: "reviews",
                element: (
                  <Suspense fallback={null}>
                    <HostReviews />
                  </Suspense>
                ),
              },
              {
                path: "vans",
                element: (
                  <Suspense fallback={null}>
                    <HostVans />
                  </Suspense>
                ),
              },
              {
                path: "vans/:id",
                element: (
                  <Suspense fallback={null}>
                    <HostVanDetail />
                  </Suspense>
                ),
                children: [
                  {
                    path: "",
                    element: (
                      <Suspense fallback={null}>
                        <HostVanInfo />
                      </Suspense>
                    ),
                  },
                  {
                    path: "pricing",
                    element: (
                      <Suspense fallback={null}>
                        <HostVanPricing />
                      </Suspense>
                    ),
                  },
                  {
                    path: "photos",
                    element: (
                      <Suspense fallback={null}>
                        <HostVanPhotos />
                      </Suspense>
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: (
          <Suspense fallback={null}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
