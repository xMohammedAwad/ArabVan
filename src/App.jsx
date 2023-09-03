import { BrowserRouter, Routes } from "react-router-dom";
import RenderRoutes from "./components/renderRoutes";
import routes from "./routes";

import "./App.css";
import "./server";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>{RenderRoutes(routes)}</Routes>
    </BrowserRouter>
  );
}
