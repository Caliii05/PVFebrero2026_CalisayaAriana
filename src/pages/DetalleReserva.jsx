import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const DetalleReserva = () => {
  const { codigoHabitacion } = useParams();
  const navigate = useNavigate();
  const { reservas } = useHotel();

  const reserva = reservas?.find(r => String(r.codigoHabitacion) === String(codigoHabitacion));
 
  const datosAlmacenados = localStorage.getItem('hotel_users'); 
  const listaUsuarios = datosAlmacenados ? JSON.parse(datosAlmacenados) : [];

  const pasajero = listaUsuarios.find(u => u.dni == reserva?.dniPasajero);

  if (!reserva) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>No hay reserva activa en la Hab. {codigoHabitacion}</h2>
        <button onClick={() => navigate('/dashboard')}>Volver</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <button 
        onClick={() => navigate('/dashboard')} 
        style={{ marginBottom: '20px', cursor: 'pointer', padding: '10px 15px', borderRadius: '5px', border: 'none', background: '#6c757d', color: 'white' }}
      >
        ← Volver al Panel
      </button>
      
      <div style={{ 
        border: '1px solid #ddd', padding: '30px', borderRadius: '15px', 
        maxWidth: '550px', margin: '0 auto', backgroundColor: '#fff',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ color: '#17a2b8', textAlign: 'center', borderBottom: '2px solid #17a2b8', paddingBottom: '10px' }}>
          Ficha de Ocupación
        </h2>
        
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: '#333' }}>👤 Datos del Pasajero</h3>
        <div style={{ backgroundColor: '#e9ecef', padding: '15px', borderRadius: '8px' }}>
  {pasajero ? (
    <>
      <p><strong>Nombre completo:</strong> {pasajero.nombre} {pasajero.apellido}</p>
      <p><strong>DNI:</strong> {pasajero.dni}</p>
      
      {/* Probamos con 'nacionalidad' (como está en tu Registro) y alternativas por si acaso */}
      <p><strong>Nacionalidad:</strong> {pasajero.nacionalidad || pasajero.Nacionalidad || "No especificada"}</p>
      
      <p><strong>Estado del Usuario:</strong> {pasajero.estado}</p>
    </>
  ) : (
    <p style={{ color: '#856404' }}>
      <strong>⚠️ Nota:</strong> Usuario no vinculado.
    </p>
  )}
</div>
        </div>
        
        <div style={{ marginTop: '25px' }}>
          <h3 style={{ color: '#333' }}>🏨 Detalles del Hospedaje</h3>
          <div style={{ padding: '15px', border: '1px solid #dee2e6', borderRadius: '8px' }}>
            <p><strong>Habitación:</strong> {codigoHabitacion}</p>
            <p><strong>Días contratados:</strong> {reserva.cantidadDias}</p>
            <p style={{ fontSize: '22px', color: '#28a745', fontWeight: 'bold' }}>
              Total Pagado: ${reserva.costoTotal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleReserva;