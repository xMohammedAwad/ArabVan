import { BrowserRouter, Routes } from "react-router-dom";
import RenderRoutes from "./components/renderRoutes";
import routes from "./routes";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>{RenderRoutes(routes)}</Routes>
    </BrowserRouter>
  );
}
