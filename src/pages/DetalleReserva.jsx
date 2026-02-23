import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import './DetalleReserva.css'; // Importamos el estilo

const DetalleReserva = () => {
  const { codigoHabitacion } = useParams();
  const navigate = useNavigate();
  const { reservas } = useHotel();

  // Buscar la reserva específica
  const reserva = reservas?.find(r => String(r.codigoHabitacion) === String(codigoHabitacion));
  
  // Obtener datos de usuarios para cruzar info del pasajero
  const datosAlmacenados = localStorage.getItem('hotel_users'); 
  const listaUsuarios = datosAlmacenados ? JSON.parse(datosAlmacenados) : [];
  const pasajero = listaUsuarios.find(u => u.dni == reserva?.dniPasajero);

  // Pantalla de error si no hay reserva
  if (!reserva) {
    return (
      <div className="detalle-container" style={{ textAlign: 'center' }}>
        <h2>No hay reserva activa en la Hab. {codigoHabitacion}</h2>
        <button className="btn-back" onClick={() => navigate('/dashboard')}>Volver al Panel</button>
      </div>
    );
  }

  return (
    <div className="detalle-container">
      <button className="btn-back" onClick={() => navigate('/dashboard')}>
        ← Volver al Panel
      </button>
      
      <div className="ficha-reserva">
        <h2>Ficha de Ocupación</h2>
        
        {/* SECCIÓN PASAJERO */}
        <div className="section-container">
          <h3 className="section-title">👤 Datos del Pasajero</h3>
          <div className="data-block bg-gray">
            {pasajero ? (
              <>
                <p><strong>Nombre completo:</strong> {pasajero.nombre} {pasajero.apellido}</p>
                <p><strong>DNI:</strong> {pasajero.dni}</p>
                <p><strong>Nacionalidad:</strong> {pasajero.nacionalidad || "No especificada"}</p>
                <p><strong>Estado del Usuario:</strong> {pasajero.estado}</p>
              </>
            ) : (
              <p className="alert-warning">
                <strong>⚠️ Nota:</strong> Usuario no vinculado en el sistema local.
              </p>
            )}
          </div>
        </div>
        
        {/* SECCIÓN HOSPEDAJE */}
        <div className="section-container">
          <h3 className="section-title">🏨 Detalles del Hospedaje</h3>
          <div className="data-block border-gray">
            <p><strong>Habitación:</strong> {codigoHabitacion}</p>
            <p><strong>Días contratados:</strong> {reserva.cantidadDias}</p>
            <p className="costo-total">
              Total Pagado: ${reserva.costoTotal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleReserva;