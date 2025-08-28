import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple authentication (in production, this should be handled by a backend)
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      onLogin(true);
      navigate('/admin/dashboard');
    } else {
      setError('Identifiants incorrects');
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-form">
          <h1>Administration</h1>
          <p>Connectez-vous pour accéder au back office</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Nom d'utilisateur</label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="login-btn">
              Se connecter
            </button>
          </form>
          
          <div className="login-info">
            <p><strong>Identifiants de test:</strong></p>
            <p>Utilisateur: admin</p>
            <p>Mot de passe: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;