import * as React from "react";
import { createRoot } from "react-dom/client";
import "./styles/layout.scss";
import "./styles/scoreTable.scss";
import "./styles/dice.scss";
import "./styles/controlButton.scss";
import "./styles/statusBar.scss";
import "./styles/outcome.scss";
import "./assets/fonts/clacon2.woff2";
import { App } from "./components/App";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div id="overlay">Please switch to portrait mode</div>
    <App />
  </React.StrictMode>
);
