import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("doconnect_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData) => {
    localStorage.setItem("doconnect_user", JSON.stringify(userData));
    localStorage.setItem("doconnect_token", userData.token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("doconnect_user");
    localStorage.removeItem("doconnect_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
