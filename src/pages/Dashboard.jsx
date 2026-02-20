import { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { habitaciones, crearReserva } = useHotel();
  const { currentUser, logout } = useAuth();
  const [filtroTipo, setFiltroTipo] = useState('Todas');
  const [dias, setDias] = useState(1);
  const navigate = useNavigate();

  // Filtrado de habitaciones por tipo (Valor agregado: Filtros)
  const habitacionesFiltradas = habitaciones.filter(h => 
    (filtroTipo === 'Todas' || h.tipo === filtroTipo) && h.estado === 'Disponible'
  );

  const handleReserva = (habitacion) => {
    if (dias <= 0) return alert("Cantidad de días no válida");
    const reserva = crearReserva(habitacion, currentUser.dni, dias);
    alert("¡Reserva realizada con éxito!");
    navigate(`/resumen/${reserva.codigo}`);
  };

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Bienvenido/a, {currentUser.nombre}</h2>
        <button onClick={() => { logout(); navigate('/login'); }} style={{ background: 'red' }}>Salir</button>
      </header>

      <section>
        <h3>Reservar Habitación</h3>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <label>Filtrar por tipo:</label>
          <select onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="Todas">Todas</option>
            <option value="Simple">Simple</option>
            <option value="Doble">Doble</option>
            <option value="Triple">Triple</option>
            <option value="Premium">Premium</option>
          </select>
          <label>Días de estadía:</label>
          <input type="number" min="1" value={dias} onChange={(e) => setDias(e.target.value)} style={{ width: '60px' }} />
        </div>

        <table border="1" width="100%" style={{ borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Tipo</th>
              <th>Costo/Día</th>
              <th>Servicios</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {habitacionesFiltradas.map(hab => (
              <tr key={hab.codigo}>
                <td>{hab.codigo}</td>
                <td>{hab.tipo}</td>
                <td>${hab.costo}</td>
                <td>{hab.servicios}</td>
                <td>
                  <button onClick={() => handleReserva(hab)}>Reservar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;