// src/context/SidebarTitleContext.tsx
import React, { createContext, useContext } from "react";

export interface SidebarTitleProp {
  title?: string;
  module?: string;
  service?: string[];
  route?: string[];
  feature?: string[];
}

const sidebarTitle: SidebarTitleProp[] = [
  {
    title: "MAIN",
    module: "Dashboard",
    service: ["Product", "Authentication"],
    route: ["/product", "/authentication"],
    feature: ["Sales", "Analytics", "Ecommerce"],
  },
  {
    title: "WEB APPS",
    module: "Apps",
    service: ["Ecommerce", "Authentication"],
    route: ["/ecommerce", "/authentication"],
    feature: ["Sales", "Analytics", "Ecommerce"],
  },
];

interface SidebarTitleContextType {
  sidebarTitle: SidebarTitleProp[];
}

const SidebarTitleContext = createContext<SidebarTitleContextType | undefined>(undefined);

export const SidebarTitleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SidebarTitleContext.Provider value={{ sidebarTitle }}>
      {children}
    </SidebarTitleContext.Provider>
  );
};

export const useSidebarTitle = (): SidebarTitleContextType => {
  const context = useContext(SidebarTitleContext);
  if (!context) {
    throw new Error("useSidebarTitle must be used within a SidebarTitleProvider");
  }
  return context;
};
