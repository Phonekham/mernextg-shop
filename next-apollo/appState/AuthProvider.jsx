import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";

export const AuthContext = createContext();

const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useState(userData);

  useEffect(() => {
    const syncLockout = (e) => {
      if (e.key === "logout") {
        setUser(null);
        Router.push("/products");
      }
    };
    window.addEventListener("storage", syncLockout);
    return () => {
      window.removeEventListener("storage", syncLockout);
      window.localStorage.removeItem("logout");
    };
  }, []);

  const setAuthUser = (userInfo) => setUser(userInfo);

  const signout = () => {
    Cookies.remove("jwt");
    setUser(null);
    localStorage.setItem("logout", Date.now());
    Router.push("/products");
  };

  return (
    <AuthContext.Provider value={{ user, setAuthUser, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
