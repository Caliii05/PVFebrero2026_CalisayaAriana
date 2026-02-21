import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Panel Principal</h1>
      <p>Bienvenido: {currentUser?.nombre}</p>
      
      <hr />
      
      {/* Sección vacía para habitaciones */}
      <div>
        <h3>Habitaciones</h3>
        <p>Cargando información del sistema...</p>
      </div>
    </div>
  );
};

export default Dashboard;