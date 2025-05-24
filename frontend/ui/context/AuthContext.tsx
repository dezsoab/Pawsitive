"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  act,
} from "react";
import { checkIfAuthenticated } from "@/api/get/checkIfAuthenticated";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (state: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isAuthenticated = await checkIfAuthenticated();
        setIsLoggedIn(isAuthenticated);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
