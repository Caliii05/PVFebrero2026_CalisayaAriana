import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HotelProvider } from './context/HotelContext';

// Importación de las páginas que creamos
import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import ResumenReserva from './pages/ResumenReserva';

/**
 * Componente de Ruta Protegida
 * Si el usuario no está logueado, lo manda al Login.
 */
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <HotelProvider>
        <BrowserRouter>
          <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f9' }}>
            {/* Contenedor de Rutas */}
            <Routes>
              {/* Rutas Públicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />

              {/* Rutas Privadas (Solo accesibles tras el Login) */}
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/resumen/:reservaId" 
                element={
                  <PrivateRoute>
                    <ResumenReserva />
                  </PrivateRoute>
                } 
              />

              {/* Redirección: Si entra a "/" o cualquier otra ruta, va a Login */}
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </BrowserRouter>
      </HotelProvider>
    </AuthProvider>
  );
}

export default App;