import React from 'react';
import './LoginForm.css';

export default function LoginForm() {
  return (
    <div className="login-container">
      <div className="login-left">
        <h3>Permítanos ayudarle...</h3>
        <input type="text" placeholder="Usuario" className="login-input" />
        <input type="password" placeholder="Contraseña" className="login-input" />
        <p className="forgot">¿Olvidó Su Contraseña?</p>
        <button className="login-button">Login</button>
        <p className="register-text">¿No tienes una cuenta? <span>Sign Up</span></p>
      </div>
      <div className="login-right">
        <img src="/assets/logo.png" alt="Smart House Logo" className="logo" />
      </div>
    </div>
  );
}