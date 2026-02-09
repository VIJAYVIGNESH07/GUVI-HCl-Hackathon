import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiPost } from "../lib/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const result = await apiPost("/api/auth/login", { email, password });
    setToken(result.access_token);
    setUser(result.user);
    localStorage.setItem("auth_token", result.access_token);
    localStorage.setItem("auth_user", JSON.stringify(result.user));
  };

  const register = async (name, email, password) => {
    const result = await apiPost("/api/auth/register", { name, email, password });
    setToken(result.access_token);
    setUser(result.user);
    localStorage.setItem("auth_token", result.access_token);
    localStorage.setItem("auth_user", JSON.stringify(result.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  const value = useMemo(
    () => ({ user, token, login, register, logout, loading }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
