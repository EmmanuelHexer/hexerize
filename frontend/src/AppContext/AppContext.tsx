import React, { createContext, useContext, useState, type ReactNode } from "react";

// Create the context
type AppContextType = {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | null>(null);

// Provider component

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [showMenu, setShowMenu] = useState(false);

  const value = { showMenu, setShowMenu };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use in components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
