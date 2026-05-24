import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCurrentUser } from './authService';

const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      const token = localStorage.getItem("auth_token");
      
      // Stop execution immediately if token is missing
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await fetchCurrentUser();
        if (userData) setUser(userData);
      } catch (err) {
        console.error("Session verification failed", err);
      } finally {
        setLoading(false);
      }
    }
    initAuth();
  }, []);

  const login = (token: string, userData: any) => {
    localStorage.setItem("auth_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);