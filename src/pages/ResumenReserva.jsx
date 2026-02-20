import { useParams, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import { useAuth } from '../context/AuthContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ResumenReserva = () => {
  const { reservaId } = useParams();
  const { reservas, habitaciones } = useHotel();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const reserva = reservas.find(r => r.codigo === reservaId);
  const habitacion = habitaciones.find(h => h.codigo === reserva?.codigoHabitacion);

  if (!reserva) return <p>Cargando reserva...</p>;

  const descargarPDF = () => {
    const doc = new jsPDF();
    doc.text("Comprobante de Reserva - Hotel Continental", 10, 10);
    doc.autoTable({
      startY: 20,
      head: [['Concepto', 'Detalle']],
      body: [
        ['Pasajero', `${currentUser.apellido}, ${currentUser.nombre}`],
        ['DNI', currentUser.dni],
        ['Habitación', habitacion.tipo],
        ['Código Habitación', habitacion.codigo],
        ['Días', reserva.cantidadDias],
        ['Costo Total', `$${reserva.costoTotal}`],
        ['Fecha', reserva.fechaReserva],
      ],
    });
    doc.save(`Reserva_${reserva.codigo}.pdf`);
  };

  return (
    <div className="container">
      <h2>Resumen de tu Reserva</h2>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
        <p><strong>Código de Reserva:</strong> {reserva.codigo}</p>
        <hr />
        <h4>Datos del Pasajero:</h4>
        <p>{currentUser.apellido}, {currentUser.nombre} (DNI: {currentUser.dni})</p>
        
        <h4>Datos de la Habitación:</h4>
        <p>Tipo: {habitacion.tipo} - {habitacion.descripcion}</p>
        <p>Servicios: {habitacion.servicios}</p>
        
        <h4>Costo:</h4>
        <p>Días: {reserva.cantidadDias} x ${habitacion.costo}</p>
        <h3 style={{ color: 'green' }}>Total a Pagar: ${reserva.costoTotal}</h3>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={descargarPDF} style={{ background: '#28a745' }}>Imprimir PDF</button>
        <button onClick={() => navigate('/dashboard')} style={{ background: '#6c757d' }}>Volver al Inicio</button>
      </div>
    </div>
  );
};
