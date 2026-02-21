import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(correo, password);
    if (success) {
      navigate('/dashboard');
    } else {
      alert("Credenciales incorrectas o usuario no registrado");
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <div style={{ border: '1px solid #ddd', padding: '30px', display: 'inline-block', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1a73e8' }}>Hotel Calisaya - Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '250px' }}>
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={correo} 
            onChange={(e) => setCorreo(e.target.value)} 
            required 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Iniciar Sesión
          </button>
        </form>
        <p style={{ marginTop: '20px' }}>
          ¿No tienes cuenta? <Link to="/registro" style={{ color: '#1a73e8' }}>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;