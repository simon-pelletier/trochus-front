import React from "react";

import { MainLayout } from "src/layouts";

import Home from "src/pages/Home";
import Profil from "src/pages/Profil";
import Items from "src/pages/Items";
import Market from "src/pages/Market";

import AddItem from "src/pages/Items/AddItem";

import EmailConfirmation from "../pages/EmailConfirmation";

import Unauthorized from "src/pages/Error/Unauthorized";
import Forbidden from "src/pages/Error/Forbidden";
import NotFound from "src/pages/Error/NotFound";

export default [
  {
    element: <MainLayout />,
    path: "/",
    children: [
      { path: "", element: <Home /> },
      { path: "/confirm/:token", element: <EmailConfirmation /> },
      { path: "/profil", element: <Profil /> },
      { path: "/items", element: <Items /> },
      { path: "/market", element: <Market /> },
      { path: "/additem", element: <AddItem /> },
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
