import React from 'react';
import './CardMenu.css';

export default function CardMenu({ title }) {
  return (
    <div className="card-menu">
      <div className="icon">👤</div>
      <h4>{title}</h4>
    </div>
  );
}