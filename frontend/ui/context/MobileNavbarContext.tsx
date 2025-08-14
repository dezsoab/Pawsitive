"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MobileNavbarContextType {
  color: string;
  setColor: (color: string) => void;
}

const MobileNavbarContext = createContext<MobileNavbarContextType | undefined>(
  undefined
);

export const MobileNavbarProvider = ({ children }: { children: ReactNode }) => {
  const [color, setColor] = useState<string>("transparent");

  return (
    <MobileNavbarContext.Provider value={{ color, setColor }}>
      {children}
    </MobileNavbarContext.Provider>
  );
};

export const useMobileNavbar = () => {
  const context = useContext(MobileNavbarContext);
  if (!context) {
    throw new Error(
      "useMobileNavbar must be used within a MobileNavbarProvider"
    );
  }
  return context;
};
