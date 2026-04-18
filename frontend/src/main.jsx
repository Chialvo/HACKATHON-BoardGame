/* /frontend/src/main.jsx */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import "./index.css";
import { antTheme } from "./theme";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
<ConfigProvider theme={antTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);