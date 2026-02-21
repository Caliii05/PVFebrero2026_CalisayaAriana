import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import { useAuth } from '../context/AuthContext';

const ResumenReserva = () => {
  const { codigo } = useParams(); // Obtenemos el código de la habitación de la URL
  const navigate = useNavigate();
  const { habitaciones, crearReserva } = useHotel();
  const { currentUser } = useAuth();

  const [dias, setDias] = useState(1);

  // Buscamos la habitación específica
  const habitacion = habitaciones.find(h => h.codigo === codigo);

  if (!habitacion) {
    return <p>Habitación no encontrada.</p>;
  }

  const handleConfirmar = () => {
    crearReserva(habitacion, currentUser.dni, dias);
    alert("¡Reserva confirmada con éxito!");
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h2>Confirmar Reserva</h2>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', maxWidth: '400px' }}>
        <p><strong>Habitación:</strong> {habitacion.codigo} ({habitacion.tipo})</p>
        <p><strong>Precio por noche:</strong> ${habitacion.costo}</p>
        
        <div style={{ margin: '20px 0' }}>
          <label>¿Cuántos días se hospedará? </label>
          <input 
            type="number" 
            min="1" 
            value={dias} 
            onChange={(e) => setDias(e.target.value)}
            style={{ width: '50px', padding: '5px' }}
          />
        </div>

        <h3 style={{ color: '#28a745' }}>Total a pagar: ${habitacion.costo * dias}</h3>

        <button 
          onClick={handleConfirmar}
          style={{ 
            backgroundColor: '#28a745', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            width: '100%' 
          }}
        >
          Confirmar y Finalizar
        </button>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{ marginTop: '10px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ResumenReserva;