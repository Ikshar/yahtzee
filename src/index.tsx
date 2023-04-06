import * as React from "react";
import { createRoot } from "react-dom/client";
import "./styles/styles.scss";
import "./styles/layout.scss";
import "./styles/scoreTable.scss";
import "./styles/dice.scss";
import "./styles/rollButton.scss";
import "./styles/statusBar.scss";
import { App } from "./App";

createRoot(document.getElementById("root"))
    .render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
