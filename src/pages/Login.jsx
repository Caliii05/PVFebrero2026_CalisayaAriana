import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import fondoHotel from '../assets/hotelfondo.png';
import imagenLogin from '../assets/imagenlogin.webp';
import './Login.css'; // Importamos el nuevo CSS

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginSectionRef = useRef(null);

  const scrollToLogin = () => {
    loginSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
    <div className="login-page">
      
      {/* SECCIÓN 1: BIENVENIDA */}
      <div 
        className="hero-section"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${fondoHotel})` }}
      >
        <button className="hero-btn" onClick={scrollToLogin}>
          Ingresar
        </button>
      </div>

      {/* SECCIÓN 2: FORMULARIO */}
      <div 
        className="form-section" 
        ref={loginSectionRef}
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${imagenLogin})` }}
      >
        <div className="login-card">
          <h2 className="login-title-main">¡Bienvenido a Hotel Calisaya!</h2>
          <h2 style={{ color: '#000000', marginBottom: '30px' }}>Iniciar Sesión</h2>
          
          <form onSubmit={handleSubmit} className="login-form">
            <input 
              type="email" 
              className="login-input"
              placeholder="Correo electrónico" 
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              className="login-input"
              placeholder="Contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit" className="btn-submit">
              Entrar al Sistema
            </button>
          </form>

          <p className="register-link-text">
            ¿No tienes cuenta? <Link to="/registro" className="register-link">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;