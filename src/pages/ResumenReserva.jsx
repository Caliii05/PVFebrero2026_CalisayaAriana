import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import { useAuth } from '../context/AuthContext';
import jsPDF from 'jspdf';

const ResumenReserva = () => {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const { habitaciones, crearReserva } = useHotel();
  const { currentUser } = useAuth();

  const [dias, setDias] = useState(1);
  const habitacion = habitaciones.find(h => h.codigo === codigo);

  if (!habitacion) return <div style={{ padding: '20px' }}>Cargando datos...</div>;

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(40, 167, 69);
    doc.text("COMPROBANTE DE RESERVA", 105, 20, { align: "center" });
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 25, 190, 25);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("INFORMACIÓN DEL PASAJERO", 20, 40);
    doc.setFontSize(11);
    // Usamos currentUser directamente para el PDF
    doc.text(`Nombre Completo: ${currentUser.nombre} ${currentUser.apellido}`, 20, 50);
    doc.text(`DNI: ${currentUser.dni}`, 20, 60);
    doc.text(`Nacionalidad: ${currentUser.nacionalidad}`, 20, 70);

    doc.setFontSize(14);
    doc.text("DETALLES DE LA HABITACIÓN", 20, 90);
    doc.setFontSize(11);
    doc.text(`Código: ${habitacion.codigo}`, 20, 100);
    doc.text(`Tipo: ${habitacion.tipo}`, 20, 110);
    doc.text(`Servicios: ${habitacion.servicios}`, 20, 120);

    doc.setFontSize(14);
    doc.text("RESUMEN DE PAGO", 20, 140);
    doc.setFontSize(11);
    doc.text(`Días de estancia: ${dias}`, 20, 150);
    doc.text(`Precio por noche: $${habitacion.costo}`, 20, 160);
    
    doc.setFontSize(16);
    doc.setTextColor(40, 167, 69);
    doc.text(`TOTAL A PAGAR: $${habitacion.costo * dias}`, 20, 180);

    doc.save(`Reserva_${currentUser.dni}_${habitacion.codigo}.pdf`);
  };

  const handleConfirmar = () => {

    crearReserva(
      habitacion, 
      currentUser.dni, 
      dias, 
      currentUser.nombre, 
      currentUser.apellido, 
      currentUser.nacionalidad
    );
    
    generarPDF();
    
    alert("¡Reserva exitosa! Tu comprobante se ha descargado.");
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>Confirmar Reserva</h2>
        <hr />
        
        <div style={{ margin: '20px 0' }}>
          <h4>Datos del Pasajero:</h4>
          {/* Mostramos nombre y apellido correctamente */}
          <p><strong>Pasajero:</strong> {currentUser.nombre} {currentUser.apellido}</p>
          <p><strong>DNI:</strong> {currentUser.dni}</p>
          <p><strong>Nacionalidad:</strong> {currentUser.nacionalidad}</p>
        </div>

        <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
          <h4>Detalle de Habitación:</h4>
          <p><strong>Tipo:</strong> {habitacion.tipo} ({habitacion.codigo})</p>
          <p><strong>Servicios:</strong> {habitacion.servicios}</p>
        </div>

        <div style={{ margin: '20px 0', backgroundColor: '#e9ecef', padding: '15px', borderRadius: '8px' }}>
          <label><strong>¿Cuántas noches? </strong></label>
          <input 
            type="number" 
            min="1" 
            value={dias} 
            onChange={(e) => setDias(Math.max(1, parseInt(e.target.value) || 1))}
            style={{ padding: '5px', width: '60px', marginLeft: '10px' }}
          />
          <h3 style={{ marginTop: '15px', color: '#28a745' }}>Total: ${habitacion.costo * dias}</h3>
        </div>

        <button 
          onClick={handleConfirmar} 
          style={{ width: '100%', padding: '15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
        >
          Confirmar y Descargar Comprobante (PDF)
        </button>
        
        <button onClick={() => navigate('/dashboard')} style={{ width: '100%', marginTop: '10px', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
          Volver atrás
        </button>
      </div>
    </div>
  );
};

export default ResumenReserva;