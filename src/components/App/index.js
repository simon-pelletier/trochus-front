import React from "react";
import { useRoutes } from "react-router-dom";

import pages from "src/routes/pages";

import "./style.scss";

const App = () => {
  const routes = useRoutes(pages);

  return (
    <div className="app">
      {routes}
    </div>
  );
};

export default App;
