import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorage('hotel_users', []);
  const [currentUser, setCurrentUser] = useLocalStorage('hotel_currentUser', null);

  const login = (correo, password) => {
    const safeUsers = Array.isArray(users) ? users : [];
    const user = safeUsers.find(u => u.correo === correo && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const safeUsers = Array.isArray(users) ? users : [];
    const exists = safeUsers.find(u => u.dni === userData.dni || u.correo === userData.correo);
    if (exists) return false;
    setUsers([...safeUsers, { ...userData, estado: 'Activo' }]);
    return true;
  };

  const logout = () => setCurrentUser(null);

  const value = useMemo(() => ({
    currentUser, login, register, logout
  }), [currentUser, users]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) return {}; // Devuelve objeto vacío para evitar errores de desestructuración
  return context;
};