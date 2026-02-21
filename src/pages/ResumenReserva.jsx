import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { useParams, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import { useAuth } from '../context/AuthContext';

const ResumenReserva = () => {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const { habitaciones, crearReserva } = useHotel();
  const { currentUser } = useAuth();
  const generarPDF = () => {
  console.log("Generando estructura del PDF...");
  };
  // 1. Estado para manejar los días (Mínimo 1 día)
  const [dias, setDias] = useState(1);

  const habitacion = habitaciones.find(h => h.codigo === codigo);

  if (!habitacion) {
    return <div style={{ padding: '20px' }}>Error: Habitación no encontrada.</div>;
  }

  // 2. Función para ejecutar la reserva
  const handleConfirmar = () => {
    // Usamos el DNI del usuario logueado y los días elegidos
    crearReserva(habitacion, currentUser.dni, dias);
    alert(`¡Reserva confirmada! Habitación ${habitacion.codigo} reservada por ${dias} día(s).`);
    navigate('/dashboard'); // Volvemos al panel para ver el cambio de estado
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h2>Finalizar Reserva</h2>
      
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', maxWidth: '450px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <p><strong>Detalle:</strong> Habitación {habitacion.codigo} - {habitacion.tipo}</p>
        <p><strong>Precio x Noche:</strong> ${habitacion.costo}</p>
        
        <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>¿Cuántas noches se quedará?</label>
          <input 
            type="number" 
            min="1" 
            max="30"
            value={dias} 
            onChange={(e) => setDias(Math.max(1, parseInt(e.target.value) || 1))}
            style={{ width: '60px', padding: '8px', fontSize: '16px' }}
          />
        </div>

        {/* 3. Cálculo dinámico en tiempo real */}
        <h3 style={{ color: '#2c3e50' }}>
          Total a pagar: <span style={{ color: '#27ae60' }}>${habitacion.costo * dias}</span>
        </h3>

        <hr style={{ margin: '20px 0', border: '0.5px solid #eee' }} />

        <button 
          onClick={handleConfirmar}
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: '#27ae60', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Confirmar Reserva
        </button>

        <button 
          onClick={() => navigate('/dashboard')}
          style={{ width: '100%', marginTop: '10px', background: 'none', border: 'none', color: '#7f8c8d', cursor: 'pointer' }}
        >
          Cancelar y volver
        </button>
      </div>
    </div>
  );
};

export default ResumenReserva;