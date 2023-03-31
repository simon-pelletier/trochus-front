import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

import App from "./components/App/App";

const container = document.querySelector("#root");
const root = createRoot(container);

const themeData = {
  borderRadius: 6,
  colorPrimary: "#1DA57A",
};

const Application = (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: themeData.colorPrimary,
        borderRadius: themeData.borderRadius,
      },
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);

root.render(Application);
