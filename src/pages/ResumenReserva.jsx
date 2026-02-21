import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import { useAuth } from '../context/AuthContext';

const ResumenReserva = () => {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const { habitaciones, crearReserva } = useHotel();
  const { currentUser } = useAuth();

  const [dias, setDias] = useState(1);
  const habitacion = habitaciones.find(h => h.codigo === codigo);

  if (!habitacion) return <div style={{ padding: '20px' }}>Cargando datos...</div>;

  // Lógica de PDF preparada pero no funcional (para el próximo avance)
  const generarPDF = () => {
    console.log("Generación de PDF en desarrollo para el cierre del proyecto...");
    alert("Funcionalidad de exportación a PDF en desarrollo.");
  };

  const handleConfirmar = () => {
    // Registramos la reserva en el contexto
    crearReserva(habitacion, currentUser.dni, dias);
    alert(`Reserva registrada en el sistema para ${currentUser.nombre} ${currentUser.apellido}.`);
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', color: '#1a1a1a' }}>Finalizar Proceso de Reserva</h2>
      
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
        
        {/* SECCIÓN 1: DATOS DEL PASAJERO (Pedido por consigna) */}
        <div style={{ marginBottom: '25px', padding: '15px', borderLeft: '5px solid #007bff', backgroundColor: '#f8f9fa' }}>
          <h3 style={{ marginTop: 0, color: '#007bff' }}>Información del Pasajero</h3>
          <p><strong>DNI:</strong> {currentUser.dni}</p>
          <p><strong>Apellido:</strong> {currentUser.apellido}</p>
          <p><strong>Nombre:</strong> {currentUser.nombre}</p>
          <p><strong>Nacionalidad:</strong> {currentUser.nacionalidad}</p>
        </div>

        {/* SECCIÓN 2: DATOS DE LA HABITACIÓN (Pedido por consigna) */}
        <div style={{ marginBottom: '25px', padding: '15px', borderLeft: '5px solid #6c757d', backgroundColor: '#f8f9fa' }}>
          <h3 style={{ marginTop: 0, color: '#495057' }}>Detalles de Habitación</h3>
          <p><strong>Código:</strong> {habitacion.codigo}</p>
          <p><strong>Tipo:</strong> {habitacion.tipo}</p>
          <p><strong>Servicios:</strong> {habitacion.servicios}</p>
          <p><strong>Costo por noche:</strong> ${habitacion.costo}</p>
        </div>

        {/* SECCIÓN 3: DATOS DE LA RESERVA Y COSTO TOTAL */}
        <div style={{ marginBottom: '25px', padding: '20px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>Cálculo de Estancia</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <span>Cantidad de Días:</span>
            <input 
              type="number" min="1" value={dias} 
              onChange={(e) => setDias(Math.max(1, parseInt(e.target.value) || 1))}
              style={{ padding: '8px', width: '70px', borderRadius: '4px', border: '1px solid #ced4da' }}
            />
          </div>
          <div style={{ fontSize: '22px', fontWeight: 'bold' }}>
            COSTO TOTAL: <span style={{ color: '#28a745' }}>${habitacion.costo * dias}</span>
          </div>
        </div>

        {/* ACCIONES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={handleConfirmar} style={{ padding: '15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}>
            Confirmar Reserva
          </button>
          
          <button onClick={generarPDF} style={{ padding: '12px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Descargar Comprobante (Próximamente)
          </button>

          <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', textDecoration: 'underline' }}>
            Cancelar y volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumenReserva;