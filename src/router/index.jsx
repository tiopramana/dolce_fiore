import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import { Home } from "../pages/Home.jsx";
import { Shop } from "../pages/ShopPage.jsx";
import { AboutPage } from "../pages/AboutPage.jsx";
import { ProductDetail } from "../pages/ProductDetail.jsx";
import { OrderPage } from "../pages/OrderPage.jsx";
import { NotFound } from "../pages/NotFound.jsx";
import { BlogPage } from "../pages/News.jsx";

import {
  LoadingScreen,
  PageSkeleton,
} from "../components/ui/LoadingSpinner.jsx";

export function RootLayout() {
  const location = useLocation();
  const [pageLoading, setPageLoading] = useState(false);
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      previousPath.current = location.pathname;
      setPageLoading(true);
      const timer = setTimeout(() => {
        setPageLoading(false);
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <>
      {pageLoading && <PageSkeleton />}
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "about", element: <AboutPage /> },
      { path: "news", element: <BlogPage /> },
      { path: "shop/:id/order", element: <OrderPage /> },
      { path: "shop/:id", element: <ProductDetail /> },
    ],
  },
]);

export function Root() {
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
