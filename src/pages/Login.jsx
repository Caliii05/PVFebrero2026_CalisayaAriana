import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(correo, password)) {
      navigate('/dashboard');
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hotel Continental</h1>
      <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h3>Iniciar Sesión</h3>
        <div>
          <label>Correo:</label><br/>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        </div><br/>
        <div>
          <label>Password:</label><br/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div><br/>
        <button type="submit" style={{ width: '100%' }}>Ingresar</button>
        <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
      </form>
    </div>
  );
};

export default Login;