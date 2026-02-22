import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HotelProvider } from './context/HotelContext';

// Importación de Páginas
import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import ResumenReserva from './pages/ResumenReserva';
import DetalleReserva from './pages/DetalleReserva';

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  // Si no hay usuario, mandamos al login. Si hay, mostramos el contenido.
  return currentUser ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <HotelProvider>
          <Routes>
            {/* 1. RUTAS PÚBLICAS */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            {/* 2. RUTAS PROTEGIDAS */}
            <Route 
              path="/dashboard" 
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
            />
            <Route 
              path="/resumen/:codigo" 
              element={<ProtectedRoute><ResumenReserva /></ProtectedRoute>} 
            />
            <Route 
              path="/detalle-reserva/:codigoHabitacion" 
              element={<ProtectedRoute><DetalleReserva /></ProtectedRoute>} 
            />

            {/* 3. REDIRECCIONES Y MANEJO DE ERRORES */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </HotelProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;