import React from 'react';
import { FaUser } from 'react-icons/fa';
import './adminDashboard.css';

const roles = [
  { label: 'Usuarios', key: 'usuarios', path: '/Home'},
  { label: 'Técnico', key: 'tecnico', path: '/Soporte' },
  { label: 'Vendedor', key: 'vendedor', path: '/Sale' },
  { label: 'Admin', key: 'admin', path: '/Provider' },
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