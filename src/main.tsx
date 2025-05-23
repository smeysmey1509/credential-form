import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { SidebarTitleProvider } from "./context/SidebarTitleContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarTitleProvider>
        <App />
      </SidebarTitleProvider>
    </BrowserRouter>
  </StrictMode>
);
