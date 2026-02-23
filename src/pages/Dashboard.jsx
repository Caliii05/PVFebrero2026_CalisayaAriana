import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useHotel } from '../context/HotelContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // IMPORTANTE: Importar el CSS

// Importación de imágenes
import imgSimple from '../assets/habitacionsimple.png';
import imgDoble from '../assets/habitaciondoble.png';
import imgTriple from '../assets/habitaciontriple.png';
import imgPremium from '../assets/habitacionpremium.png';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const { habitaciones, resetearReservas } = useHotel(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = currentUser?.tipo === 'Administrador';

  // Datos extendidos
  const infoExtra = {
    Simple: { desc: 'Ideal para viajeros solitarios o de negocios. Incluye escritorio y WiFi.', img: imgSimple },
    Doble: { desc: 'Perfecta para parejas. Espaciosa con cama King Size y vista al jardín.', img: imgDoble },
    Triple: { desc: 'Excelente para familias. Equipada con tres camas y Smart TV.', img: imgTriple },
    Premium: { desc: 'Lujo total. Incluye Jacuzzi privado, balcón y atención VIP.', img: imgPremium }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 style={{ margin: 0, color: '#2c3e50' }}>
          Hotel Calisaya - {isAdmin ? 'Panel Admin' : 'Portal de Reservas'}
        </h1>
        <div>
          <span>Bienvenido, <strong>{currentUser?.nombre}</strong></span>
          <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
        </div>
      </header>

      {isAdmin && (
        <div className="admin-actions">
          <h3>Acciones de Administrador</h3>
          <button onClick={resetearReservas} style={{ backgroundColor: '#dc3545', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Reiniciar Sistema (Liberar todo)
          </button>
        </div>
      )}

      <div className="habitaciones-grid">
        {habitaciones.map(hab => (
          <div key={hab.codigo} className="hab-card">
            <h3>Habitación {hab.codigo}</h3>
            
            <div className="hab-content">
              <img src={infoExtra[hab.tipo]?.img} alt={hab.tipo} className="hab-image" />
              
              <div className="hab-info">
                <p><strong>Tipo:</strong> {hab.tipo}</p>
                <p><strong>Costo:</strong> <span style={{color: '#28a745'}}>${hab.costo}</span></p>
                <p>
                  <span className={`badge ${hab.estado === 'Disponible' ? 'disponible' : 'ocupada'}`}>
                    {hab.estado}
                  </span>
                </p>
                <p className="hab-desc">{infoExtra[hab.tipo]?.desc}</p>
              </div>
            </div>

            <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '15px 0' }} />

            {!isAdmin ? (
              hab.estado === 'Disponible' ? (
                <button className="btn-primary" onClick={() => navigate(`/resumen/${hab.codigo}`)}>
                  Reservar ahora
                </button>
              ) : (
                <button className="btn-primary" disabled style={{backgroundColor: '#ccc'}}>No disponible</button>
              )
            ) : (
              <div>
                {hab.estado === 'Ocupada' ? (
                  <button className="btn-admin-info" onClick={() => navigate(`/detalle-reserva/${hab.codigo}`)}>
                    Ver Información
                  </button>
                ) : (
                  <div style={{textAlign: 'center', color: '#999'}}>Sin reservas</div>
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