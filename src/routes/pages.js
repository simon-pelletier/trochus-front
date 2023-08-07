import React from "react";

import { MainLayout } from "src/layouts";

import Home from "@pages/Home";
import Profil from "@pages/Profil";
import Items from "@pages/Items";
import Market from "@pages/Market";

import AddItem from "@pages/Items/AddItem";

import EmailConfirmation from "@pages/EmailConfirmation";

import Unauthorized from "@pages/Error/Unauthorized";
import Forbidden from "@pages/Error/Forbidden";
import NotFound from "@pages/Error/NotFound";

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
