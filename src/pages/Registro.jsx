import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Registro = () => {
  const [formData, setFormData] = useState({
    dni: '',
    apellido: '',
    nombre: '',
    fechaNacimiento: '',
    tipo: 'Pasajero', // Valor por defecto
    nacionalidad: 'Argentina', // Valor por defecto del enum
    correo: '',
    password: '',
    estado: 'Activo' // Atributo estado pedido por la consigna
  });
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Intentamos registrar al usuario con el objeto completo
    const success = register(formData);
    
    if (success) {
      alert("¡Registro exitoso! Todos tus datos han sido guardados.");
      navigate('/login');
    } else {
      alert("El DNI o Correo ya están registrados.");
    }
  };
const handleChange = (e) => {
  const { name, value } = e.target;
  const valorLimpio = name === 'dni' ? value.replace(/\D/g, '') : value;

  setFormData({
    ...formData,
    [name]: valorLimpio
  });
};
  return (
    <div style={{ padding: '30px', textAlign: 'center', fontFamily: 'Arial' }}>
      <div style={{ border: '1px solid #ddd', padding: '30px', display: 'inline-block', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
        <h2 style={{ color: '#28a745' }}>Crear Nueva Cuenta</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '350px' }}>
          
          {/* Fila de Nombre y Apellido */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <input name="nombre" type="text" placeholder="Nombre" onChange={handleChange} required 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} />
            <input name="apellido" type="text" placeholder="Apellido" onChange={handleChange} required 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} />
          </div>

          <input name="dni" type="text" placeholder="DNI (8 dígitos)"
           onChange={handleChange} required maxLength="8" pattern="\d{8}" title="El DNI debe tener exactamente 8 números"  
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />

          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '12px', color: '#666', marginLeft: '5px' }}>Fecha de Nacimiento</label>
            <input name="fechaNacimiento" type="date" onChange={handleChange} required 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '94%' }} />
          </div>

          <select name="tipo" onChange={handleChange} required 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'white' }}>
            <option value="Pasajero">Pasajero</option>
            <option value="Administrador">Administrador</option>
          </select>

          <select name="nacionalidad" onChange={handleChange} required 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'white' }}>
            <option value="Argentina">Argentina</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Chile">Chile</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Brasil">Brasil</option>
            <option value="Otro">Otro</option>
          </select>

          <input name="correo" type="email" placeholder="Correo electrónico" onChange={handleChange} required 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />

          <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />

          <button type="submit" style={{ padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>
            Registrarse
          </button>
        </form>

        <p style={{ marginTop: '20px' }}>
          ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#28a745' }}>Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;