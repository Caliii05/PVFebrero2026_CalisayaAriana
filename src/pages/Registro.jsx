import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Registro = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    dni: '',
    apellido: '',
    nombre: '',
    fechaNacimiento: '',
    tipo: 'Pasajero', 
    nacionalidad: 'Argentina', 
    correo: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register(formData)) {
      alert("Usuario registrado con éxito. Ya puedes iniciar sesión.");
      navigate('/login');
    } else {
      alert("Error: El DNI o Correo ya están registrados.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Registro de Nuevo Usuario</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name="dni" placeholder="DNI (Clave Primaria)" required onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" required onChange={handleChange} />
        <input name="nombre" placeholder="Nombre" required onChange={handleChange} />
        
        <label>Fecha de Nacimiento:</label>
        <input name="fechaNacimiento" type="date" required onChange={handleChange} />
        
        <label>Nacionalidad:</label>
        <select name="nacionalidad" onChange={handleChange}>
          <option value="Argentina">Argentina</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Brasil">Brasil</option>
          <option value="Chile">Chile</option>
          <option value="Uruguay">Uruguay</option>
        </select>

        <label>Tipo de Usuario:</label>
        <select name="tipo" onChange={handleChange}>
          <option value="Pasajero">Pasajero</option>
          <option value="Administrador">Administrador</option>
        </select>

        <input name="correo" type="email" placeholder="Correo Electrónico" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" required onChange={handleChange} />
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Registrar Usuario
        </button>
      </form>
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
    </div>
  );
};

export default Registro;