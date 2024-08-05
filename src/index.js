import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Page from "./pages/Home";
import { DataProvider } from "./contexts/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataProvider>
      <Page />
    </DataProvider>
  </React.StrictMode>
);
