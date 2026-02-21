import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    correo: '',
    password: ''
  });
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Intentamos registrar al usuario
    const success = register(formData);
    
    if (success) {
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      navigate('/login');
    } else {
      alert("El DNI o Correo ya están registrados.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <div style={{ border: '1px solid #ddd', padding: '30px', display: 'inline-block', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#28a745' }}>Crear Nueva Cuenta</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
          <input 
            name="nombre"
            type="text" 
            placeholder="Nombre Completo" 
            onChange={handleChange} 
            required 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input 
            name="dni"
            type="text" 
            placeholder="DNI" 
            onChange={handleChange} 
            required 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input 
            name="correo"
            type="email" 
            placeholder="Correo electrónico" 
            onChange={handleChange} 
            required 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input 
            name="password"
            type="password" 
            placeholder="Contraseña" 
            onChange={handleChange} 
            required 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
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