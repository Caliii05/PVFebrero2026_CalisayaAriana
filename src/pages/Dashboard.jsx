import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useHotel } from '../context/HotelContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const { habitaciones, resetearReservas, reservas } = useHotel(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Verificamos el rol
  const isAdmin = currentUser?.tipo === 'Administrador';

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <h1>Hotel Premium - {isAdmin ? 'Panel de Control' : 'Reservas'}</h1>
        <div>
          <span>Bienvenido, <strong>{currentUser?.nombre} ({currentUser?.tipo})</strong> </span>
          <button onClick={handleLogout} style={{ marginLeft: '10px', cursor: 'pointer', padding: '5px 10px' }}>Cerrar Sesión</button>
        </div>
      </header>

      {/* 10/10: SOLO EL ADMIN VE EL BOTÓN DE RESETEO */}
      {isAdmin && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', border: '1px solid #ffeeba', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#856404' }}>Funciones de Administrador</h3>
          <button onClick={resetearReservas} style={{ backgroundColor: '#dc3545', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Reiniciar sistema y liberar todas las habitaciones
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {habitaciones.map(hab => (
          <div key={hab.codigo} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: hab.estado === 'Disponible' ? '#fff' : '#f2f2f2' }}>
            <h3>Habitación {hab.codigo}</h3>
            <p><strong>Tipo:</strong> {hab.tipo}</p>
            <p><strong>Costo:</strong> ${hab.costo}</p>
            <p><strong>Estado:</strong> <span style={{ color: hab.estado === 'Disponible' ? 'green' : 'red' }}>{hab.estado}</span></p>
            
            {/* 10/10: LÓGICA DE BOTONES SEGÚN EL ROL */}
            {!isAdmin ? (
              // Si es Pasajero: Puede reservar
              hab.estado === 'Disponible' ? (
                <button 
                  onClick={() => navigate(`/resumen/${hab.codigo}`)}
                  style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Reservar ahora
                </button>
              ) : (
                <button disabled style={{ width: '100%', padding: '10px', backgroundColor: '#ccc', border: 'none', borderRadius: '5px' }}>Ocupada</button>
              )
            ) : (
              // Si es Administrador: Solo ve el estado, no reserva
              <div style={{ fontSize: '12px', color: '#666', fontStyle: 'italic', textAlign: 'center', marginTop: '10px' }}>
                Vista de solo lectura para administradores
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;