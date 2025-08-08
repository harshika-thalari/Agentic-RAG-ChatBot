import React, { createContext, useState, useContext } from 'react';
import { getProfile } from '../api/apiService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Will store { id, email, user_type }

  const login = async (email) => {
    try {
      const profile = await getProfile(email);
      setUser({ ...profile, email }); // Save id, user_type, and email
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check the email or try again.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);