import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useHotel } from '../context/HotelContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const { habitaciones, resetearReservas } = useHotel(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Verificamos el rol del usuario logueado
  const isAdmin = currentUser?.tipo === 'Administrador';

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '2px solid #ddd', 
        paddingBottom: '15px',
        backgroundColor: '#fff',
        padding: '10px 20px',
        borderRadius: '8px'
      }}>
        <h1 style={{ margin: 0, color: '#2c3e50' }}>
          Hotel Calisaya - {isAdmin ? 'Panel de Control' : 'Portal de Reservas'}
        </h1>
        <div>
          <span>Bienvenido, <strong>{currentUser?.nombre}</strong> <small>({currentUser?.tipo})</small></span>
          <button 
            onClick={handleLogout} 
            style={{ marginLeft: '15px', cursor: 'pointer', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* SECCIÓN EXCLUSIVA PARA ADMIN: RESETEO DEL SISTEMA */}
      {isAdmin && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', border: '1px solid #ffeeba', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#856404' }}>Acciones de Administrador</h3>
          <button 
            onClick={resetearReservas} 
            style={{ backgroundColor: '#dc3545', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Reiniciar Sistema (Liberar todo)
          </button>
        </div>
      )}

      {/* GRILLA DE HABITACIONES */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '25px', 
        marginTop: '30px' 
      }}>
        {habitaciones.map(hab => (
          <div 
            key={hab.codigo} 
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '12px', 
              padding: '20px', 
              backgroundColor: '#fff',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}
          >
            <h3 style={{ marginTop: 0, color: '#34495e' }}>Habitación {hab.codigo}</h3>
            <p><strong>Tipo:</strong> {hab.tipo}</p>
            <p><strong>Costo:</strong> <span style={{ color: '#28a745', fontWeight: 'bold' }}>${hab.costo}</span></p>
            <p><strong>Estado:</strong> 
              <span style={{ 
                marginLeft: '10px',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '14px',
                backgroundColor: hab.estado === 'Disponible' ? '#d4edda' : '#f8d7da',
                color: hab.estado === 'Disponible' ? '#155724' : '#721c24'
              }}>
                {hab.estado}
              </span>
            </p>
            
            <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '15px 0' }} />

            {/* LÓGICA DE BOTONES SEGÚN EL ROL Y ESTADO */}
            {!isAdmin ? (
              // VISTA DEL PASAJERO
              hab.estado === 'Disponible' ? (
                <button 
                  onClick={() => navigate(`/resumen/${hab.codigo}`)}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}
                >
                  Reservar ahora
                </button>
              ) : (
                <button disabled style={{ width: '100%', padding: '12px', backgroundColor: '#ccc', color: '#666', border: 'none', borderRadius: '6px' }}>
                  No disponible
                </button>
              )
            ) : (
              // VISTA DEL ADMINISTRADOR
              <div>
                {hab.estado === 'Ocupada' ? (
                  <button 
                    onClick={() => navigate(`/detalle-reserva/${hab.codigo}`)} 
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      backgroundColor: '#17a2b8', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '6px', 
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Ver Información de Reserva
                  </button>
                ) : (
                  <div style={{ fontSize: '14px', color: '#666', fontStyle: 'italic', textAlign: 'center', padding: '10px' }}>
                    Sin reservas activas
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;