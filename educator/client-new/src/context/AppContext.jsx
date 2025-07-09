import React, { createContext } from "react";

// Create context
const AppContext = createContext();

// Provider component to wrap your app and provide context values
export const AppProvider = ({ children }) => {
  const backendUrl = "http://localhost:5000"; // Your backend URL

  const getToken = () => {
    return localStorage.getItem("token"); // Read JWT token from localStorage
  };

  const isEducator = true; // Placeholder, replace with real auth logic later

  return (
    <AppContext.Provider value={{ backendUrl, getToken, isEducator }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
