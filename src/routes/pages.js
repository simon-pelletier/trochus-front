import React from "react";

import { MainLayout } from "src/layouts";

import Home from "src/pages/Home";

import Unauthorized from "src/pages/Error/Unauthorized";
import Forbidden from "src/pages/Error/Forbidden";
import NotFound from "src/pages/Error/NotFound";

export default [
  {
    element: <MainLayout />,
    path: "/",
    children: [
      { path: "", element: <Home /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <MainLayout />,
    path: "error",
    children: [
      { path: "401", element: <Unauthorized /> },
      { path: "403", element: <Forbidden /> },
      { path: "404", element: <NotFound /> },
    ],
  },
];
