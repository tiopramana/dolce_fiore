import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "../pages/Home.jsx";
import { Catalog } from "../pages/Catalog.jsx";
import { Category } from "../pages/Category.jsx";
import { ProductDetail } from "../pages/ProductDetail.jsx";
import { NotFound } from "../pages/NotFound.jsx";

import { LoadingScreen } from "../components/ui/LoadingSpinner.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "catalog", element: <Catalog /> },
      { path: "category", element: <Category /> },
      { path: "product-detail", element: <ProductDetail /> },
    ],
  },
]);

function Root() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
