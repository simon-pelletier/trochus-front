import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";

const container = document.querySelector("#root");
const root = createRoot(container);

const Application = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

root.render(Application);
