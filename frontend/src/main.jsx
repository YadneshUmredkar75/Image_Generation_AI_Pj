import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StoreProvider from "./component/StorContext/StoreContext"; // ✅ make sure path is correct
import "./index.css"; // if you're using global styles

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
