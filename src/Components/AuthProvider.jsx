
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";

const fakeAuth = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve('2342f2f1d131rf12'), 250);
    });
  }

const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const token = await fakeAuth();

    setToken(token);
    navigate("/");
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider