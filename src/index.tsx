import * as React from "react";
import { createRoot } from "react-dom/client";
import "./styles/styles.scss";
import "./styles/layout.scss";
import "./styles/scoreTable.scss";
import "./styles/dice.scss";
import "./styles/controlButton.scss";
import "./styles/statusBar.scss";
import { App } from "./components/App";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
