import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
<link rel="icon" href="%PUBLIC_URL%/hammers-logo.png" />;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
