import React from 'react';
import { FaUser } from 'react-icons/fa';
import './adminDashboard.css';
import { useNavigate } from 'react-router-dom';

const roles = [
  { label: 'Usuarios', key: 'usuarios', path: '/'},
  { label: 'Técnico', key: 'tecnico', path: '/tecnico' },
  { label: 'Vendedor', key: 'vendedor', path: '/sale' },
  { label: 'Admin', key: 'admin', path: '/provider' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      {roles.map((role) => (
        <div
          className="dashboard-card"
          key={role.key}
          onClick={() => handleCardClick(role.path)}
        >
          <FaUser className="icon" />
          <span className="label">{role.label}</span>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;