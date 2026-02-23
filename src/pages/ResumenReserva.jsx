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

  if (!habitacion) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
        <h3>Cargando datos de la habitación...</h3>
      </div>
    );
  }

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
    <div style={{ 
      padding: '30px', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f8f9fa', 
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ 
        maxWidth: '600px', 
        width: '100%',
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '15px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '10px' }}>Confirmar Reserva</h2>
        <p style={{ textAlign: 'center', color: '#6c757d', marginBottom: '20px' }}>Revise los detalles antes de finalizar</p>
        <hr style={{ border: '0', borderTop: '1px solid #eee', marginBottom: '20px' }} />
        
        {/* SECCIÓN PASAJERO */}
        <div style={{ marginBottom: '25px' }}>
          <h4 style={{ color: '#495057', marginBottom: '10px', borderLeft: '4px solid #28a745', paddingLeft: '10px' }}>
            Datos del Pasajero
          </h4>
          <div style={{ padding: '15px', backgroundColor: '#fdfdfd', border: '1px solid #f1f1f1', borderRadius: '8px' }}>
            <p style={{ margin: '5px 0' }}><strong>Pasajero:</strong> {currentUser.nombre} {currentUser.apellido}</p>
            <p style={{ margin: '5px 0' }}><strong>DNI:</strong> {currentUser.dni}</p>
            <p style={{ margin: '5px 0' }}><strong>Nacionalidad:</strong> {currentUser.nacionalidad}</p>
          </div>
        </div>

        {/* SECCIÓN HABITACIÓN */}
        <div style={{ marginBottom: '25px' }}>
          <h4 style={{ color: '#495057', marginBottom: '10px', borderLeft: '4px solid #17a2b8', paddingLeft: '10px' }}>
            Detalle de Habitación
          </h4>
          <div style={{ padding: '15px', backgroundColor: '#fdfdfd', border: '1px solid #f1f1f1', borderRadius: '8px' }}>
            <p style={{ margin: '5px 0' }}><strong>Tipo:</strong> {habitacion.tipo} ({habitacion.codigo})</p>
            <p style={{ margin: '5px 0' }}><strong>Servicios:</strong> {habitacion.servicios}</p>
          </div>
        </div>

        {/* SECCIÓN PAGO */}
        <div style={{ 
          margin: '25px 0', 
          backgroundColor: '#e9ecef', 
          padding: '20px', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <label style={{ fontWeight: 'bold', fontSize: '16px' }}>¿Cuántas noches se hospedará? </label>
          <input 
            type="number" 
            min="1" 
            value={dias} 
            onChange={(e) => setDias(Math.max(1, parseInt(e.target.value) || 1))}
            style={{ 
              padding: '8px', 
              width: '70px', 
              marginLeft: '10px', 
              borderRadius: '5px', 
              border: '1px solid #ccc',
              textAlign: 'center',
              fontSize: '16px'
            }}
          />
          <div style={{ marginTop: '20px' }}>
            <span style={{ fontSize: '18px', color: '#495057' }}>Total a pagar:</span>
            <h2 style={{ margin: '5px 0', color: '#28a745', fontSize: '32px' }}>${habitacion.costo * dias}</h2>
          </div>
        </div>

        {/* BOTONES */}
        <button 
          onClick={handleConfirmar} 
          style={{ 
            width: '100%', 
            padding: '16px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontWeight: 'bold', 
            fontSize: '16px',
            boxShadow: '0 4px 6px rgba(40, 167, 69, 0.2)',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
        >
          Confirmar y Descargar Comprobante (PDF)
        </button>
        
        <button 
          onClick={() => navigate('/dashboard')} 
          style={{ 
            width: '100%', 
            marginTop: '15px', 
            background: 'none', 
            border: 'none', 
            color: '#6c757d', 
            cursor: 'pointer',
            textDecoration: 'underline',
            fontSize: '14px'
          }}
        >
          Cancelar y volver al panel
        </button>
      </div>
    </div>
  );
};

export default ResumenReserva;