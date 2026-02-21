import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const ResumenReserva = () => {
  const { codigo } = useParams(); // Recibimos el código (101, 201, etc.)
  const navigate = useNavigate();
  const { habitaciones } = useHotel();

  // Buscamos la habitación para mostrar la info
  const habitacion = habitaciones.find(h => h.codigo === codigo);

  // Si por alguna razón no la encuentra, mostramos un aviso
  if (!habitacion) {
    return <div style={{ padding: '20px' }}>Error: Habitación no encontrada.</div>;
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h2>Resumen de tu Selección</h2>
      
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
        <p><strong>Habitación seleccionada:</strong> {habitacion.codigo}</p>
        <p><strong>Tipo:</strong> {habitacion.tipo}</p>
        <p><strong>Precio base por noche:</strong> ${habitacion.costo}</p>
        
        <hr />
        
        <p style={{ color: '#666' }}>
      
        </p>

        <button 
          onClick={() => navigate('/dashboard')}
          style={{ marginTop: '10px', cursor: 'pointer' }}
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
};

export default ResumenReserva;