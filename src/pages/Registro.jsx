import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Registro.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    dni: '',
    apellido: '',
    nombre: '',
    fechaNacimiento: '',
    tipo: 'Pasajero', 
    nacionalidad: 'Argentina', 
    correo: '',
    password: '',
    estado: 'Activo' 
  });
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
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
    let valorFiltrado = value;

    // LÓGICA DE VALIDACIÓN SEGÚN EL CAMPO
    if (name === 'dni') {
      // Solo números
      valorFiltrado = value.replace(/\D/g, '');
    } else if (name === 'nombre' || name === 'apellido') {
      // Solo letras (incluye tildes, eñes y espacios)
      // El regex [^a-zA-ZáéíóúÁÉÍÓÚñÑ ] busca todo lo que NO sea letra o espacio y lo elimina
      valorFiltrado = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');
    }

    setFormData({
      ...formData,
      [name]: valorFiltrado
    });
  };

  return (
    <div className="registro-page">
      <div className="registro-card">
        <h2>Crear Nueva Cuenta</h2>
        
        <form onSubmit={handleSubmit} className="registro-form">
          
          <div className="form-row">
            <input 
              name="nombre" 
              type="text" 
              className="registro-input"
              placeholder="Nombre" 
              value={formData.nombre} // Agregado para que el input sea controlado
              onChange={handleChange} 
              required 
            />
            <input 
              name="apellido" 
              type="text" 
              className="registro-input"
              placeholder="Apellido" 
              value={formData.apellido} // Agregado para que el input sea controlado
              onChange={handleChange} 
              required 
            />
          </div>

          <input 
            name="dni" 
            type="text" 
            className="registro-input"
            placeholder="DNI (8 dígitos)"
            value={formData.dni} // Agregado para que el input sea controlado
            onChange={handleChange} 
            required 
            maxLength="8" 
            pattern="\d{8}" 
            title="El DNI debe tener exactamente 8 números"  
          />

          <div className="input-group">
            <label className="input-label">Fecha de Nacimiento</label>
            <input 
              name="fechaNacimiento" 
              type="date" 
              className="registro-input"
              onChange={handleChange} 
              required 
            />
          </div>

          <select name="tipo" className="registro-select" onChange={handleChange} required>
            <option value="Pasajero">Pasajero</option>
            <option value="Administrador">Administrador</option>
          </select>

          <select name="nacionalidad" className="registro-select" onChange={handleChange} required>
            <option value="Argentina">Argentina</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Chile">Chile</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Brasil">Brasil</option>
            <option value="Otro">Otro</option>
          </select>

          <input 
            name="correo" 
            type="email" 
            className="registro-input"
            placeholder="Correo electrónico" 
            onChange={handleChange} 
            required 
          />

          <input 
            name="password" 
            type="password" 
            className="registro-input"
            placeholder="Contraseña" 
            onChange={handleChange} 
            required 
          />

          <button type="submit" className="btn-register">
            Registrarse
          </button>
        </form>

        <p className="login-link-text">
          ¿Ya tienes cuenta? <Link to="/login" className="login-link">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;