import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { SidebarTitleProvider } from "./context/SidebarTitleContext";
import { PopupProvider } from "./context/PopupContext";
import { ToastProvider } from "./context/ToasterContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarTitleProvider>
        <PopupProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </PopupProvider>
      </SidebarTitleProvider>
    </BrowserRouter>
  </StrictMode>
);
