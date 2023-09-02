import { Route } from "react-router-dom";

export default function RenderRoutes(routes) {
  return routes.map((route, i) => (
    <Route
      key={i}
      path={route.path}
      element={route.element ? <route.element /> : null}
    >
      {route.children && RenderRoutes(route.children)}
    </Route>
  ));
}
