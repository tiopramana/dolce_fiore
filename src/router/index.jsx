import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App.jsx";
import { Home } from "../pages/Home.jsx";
import { Catalog } from "../pages/Catalog.jsx";
import { Category } from "../pages/Category.jsx";
import { ProductDetail } from "../pages/ProductDetail.jsx";
import { NotFound } from "../pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />, // App serves as the root/layout wrapper
    errorElement: <NotFound />, // Catches 404s and component errors
    children: [
      { index: true, element: <Home /> }, // Renders at "/"
      { path: "catalog", element: <Catalog /> }, // Renders at "/catalog"
      { path: "category", element: <Category /> }, // Renders at "/categort"
      { path: "product-detail", element: <ProductDetail /> }, // Renders at "/product-detail"
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
