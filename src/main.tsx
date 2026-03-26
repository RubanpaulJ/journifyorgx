import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { AppConfigProvider } from "./state/AppConfig";
import { ThemeProvider } from "./state/Theme";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppConfigProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppConfigProvider>
    </ThemeProvider>
  </React.StrictMode>
);

