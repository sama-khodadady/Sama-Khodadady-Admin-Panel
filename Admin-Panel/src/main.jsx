import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import QueryProvider from "providers/QueryProvider.jsx";

import "./styles/global.css";
import "./styles/fonts.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <QueryProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryProvider>
  // </StrictMode>
);
