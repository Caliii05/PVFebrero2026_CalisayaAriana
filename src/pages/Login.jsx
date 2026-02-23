import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import fondoHotel from '../assets/hotelfondo.png';
import imagenLogin from '../assets/imagenlogin.webp';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // REFERENCIA PARA EL SALTO AL FORMULARIO
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
    <div style={{ fontFamily: 'Arial', overflowX: 'hidden' }}>
      
      {/* --- SECCIÓN 1: BIENVENIDA --- */}
      <div style={{
        height: '100vh',
        width: '100%',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${fondoHotel})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        {/* BOTÓN PARA IR AL FORMULARIO DE LOGIN */}
        <button 
          onClick={scrollToLogin}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.color = '#1a73e8';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = 'white';
          }}
          style={{
            padding: '15px 40px',
            fontSize: '18px',
            backgroundColor: 'transparent',
            color: 'white',
            border: '2px solid white',
            borderRadius: '30px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontWeight: 'bold',
            marginTop: '20px'
          }}
        >
          Ingresar
        </button>
      </div>

     {/* --- SECCIÓN 2: FORMULARIO --- */}
      <div 
        ref={loginSectionRef} 
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // CAMBIAMOS EL COLOR POR LA IMAGEN:
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${imagenLogin})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '20px'
        }}
      >
        <div style={{ 
  background: `linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(220,220,120,0.9) 25%, rgba(195,193,78,0.9) 50%, rgba(160,158,60,0.9) 75%, rgba(255,255,255,0.6) 100%)`,
  boxShadow: '0 4px 15px rgba(255,255,255,0.4), inset 0 0 20px rgba(255,255,255,0.3)',
  border: '1px solid rgba(255,255,255,0.6)', 
  padding: '40px',
  borderRadius: '15px', 
  width: '100%',
  maxWidth: '350px',
  textAlign: 'center',
  backdropFilter: 'blur(10px)'
}}>
         <h2 style={{ 
  color: '#000000', 
  marginBottom: '30px', 
  fontStyle: 'italic',
  fontWeight: '800',
  fontSize: '28px',
  letterSpacing: '1px',
  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  borderBottom: '2px solid rgba(229, 235, 235, 0.96)',
  display: 'inline-block',
  paddingBottom: '5px'
}}>
  ¡Bienvenido a Hotel Calisaya!
</h2>
          <h2
          style={{ color: '#000000', marginBottom: '30px' }}>Iniciar Sesión</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)} 
              required 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
            />
            <button type="submit" style={{ 
              padding: '12px', 
              background: '#000000', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}>
              Entrar al Sistema
            </button>
          </form>

          <p style={{ marginTop: '25px', fontSize: '14px' }}>
            ¿No tienes cuenta? <Link to="/registro" style={{ color: '#ecfaff', fontWeight: 'bold', textDecoration: 'none' }}>Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;