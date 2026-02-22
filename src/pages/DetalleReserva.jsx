import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import { useAuth } from '../context/AuthContext';

const DetalleReserva = () => {
  const { codigoHabitacion } = useParams();
  const navigate = useNavigate();
  const { reservas } = useHotel();

  // 1. Buscamos la reserva
  const reserva = reservas?.find(r => r.codigoHabitacion === codigoHabitacion);

  // 2. BUSQUEDA MEJORADA: Probamos todas las claves posibles donde se guardan usuarios
  const datosUsers = localStorage.getItem('usuarios') || 
                     localStorage.getItem('users') || 
                     localStorage.getItem('hotel_usuarios');
  
  const listaUsuarios = datosUsers ? JSON.parse(datosUsers) : [];

  // 3. COMPARACIÓN FLEXIBLE: Convertimos ambos a String para evitar errores de tipo
  const pasajero = listaUsuarios.find(u => 
    String(u.dni).trim() === String(reserva?.dniPasajero).trim()
  );

  if (!reserva) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>No hay reserva activa</h2>
        <button onClick={() => navigate('/dashboard')}>Volver</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <button 
        onClick={() => navigate('/dashboard')} 
        style={{ marginBottom: '20px', cursor: 'pointer', padding: '8px 15px', borderRadius: '5px' }}
      >
        ← Volver al Panel
      </button>
      
      <div style={{ 
        border: '1px solid #ddd', padding: '30px', borderRadius: '15px', 
        maxWidth: '550px', margin: '0 auto', backgroundColor: '#fff',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ color: '#17a2b8', textAlign: 'center' }}>Detalle de Reserva: Hab. {codigoHabitacion}</h2>
        
        <div style={{ backgroundColor: '#f1f8f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>Datos del Pasajero</h3>
          {/* Usamos || 'Cargando...' por si los datos tardan un milisegundo */}
          <p><strong>Nombre:</strong> {pasajero ? `${pasajero.nombre} ${pasajero.apellido}` : "No encontrado en la lista"}</p>
          <p><strong>DNI:</strong> {reserva.dniPasajero}</p>
          <p><strong>Nacionalidad:</strong> {pasajero?.nacionalidad || "No disponible"}</p>
        </div>
        
        <div style={{ backgroundColor: '#fff', padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
          <h3>Información de Estadía</h3>
          <p><strong>Días:</strong> {reserva.cantidadDias}</p>
          <p style={{ fontSize: '20px', color: '#28a745' }}><strong>Total:</strong> ${reserva.costoTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default DetalleReserva;