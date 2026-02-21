import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useHotel } from '../context/HotelContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const { habitaciones } = useHotel();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <h1>Panel de Reservas</h1>
        <div>
          <span>Bienvenido, <strong>{currentUser?.nombre}</strong> </span>
          <button onClick={handleLogout} style={{ marginLeft: '10px', cursor: 'pointer', padding: '5px 10px' }}>Cerrar Sesión</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {habitaciones.map(hab => (
          <div key={hab.codigo} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: hab.estado === 'Disponible' ? '#fff' : '#f2f2f2' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Habitación {hab.codigo}</h3>
            <p><strong>Tipo:</strong> {hab.tipo}</p>
            <p><strong>Precio:</strong> ${hab.costo}</p> {/* Cambiado de hab.precio a hab.costo */}
            <p><strong>Servicios:</strong> {hab.servicios}</p>
            <p><strong>Estado:</strong> <span style={{ color: hab.estado === 'Disponible' ? 'green' : 'red', fontWeight: 'bold' }}>{hab.estado}</span></p>
            
            {hab.estado === 'Disponible' ? (
              <button 
                onClick={() => navigate(`/resumen/${hab.codigo}`)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
              >
                Reservar ahora
              </button>
            ) : (
              <button disabled style={{ width: '100%', padding: '10px', backgroundColor: '#ccc', color: '#666', border: 'none', borderRadius: '5px', marginTop: '10px' }}>
                No disponible
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;