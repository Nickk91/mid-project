// AuthContext.js

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  console.log(userEmail);
  console.log(isLoggedIn);
  const login = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userEmail, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
