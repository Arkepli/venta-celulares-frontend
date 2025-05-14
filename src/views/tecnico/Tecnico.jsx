import React, { useState } from 'react';
import './Tecnico.css';

const Tecnico = () => {
  const [filters, setFilters] = useState({
    causa: '',
    fecha: '',
    marca: '',
    referencia: '',
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleLimpiar = () => {
    setFilters({ causa: '', fecha: '', marca: '', referencia: '' });
  };

  const handleConsultar = () => {
    // Aquí iría la lógica de filtro
    console.log('Consultando con filtros:', filters);
  };

  const citas = [
    {
      cliente: 'Milena Cardozo',
      cedula: '10245232020',
      causa: 'Pantalla rota',
      marca: 'Xiaomi',
      referencia: 'Note 12S',
      hora: '10:20 a.m',
      fecha: '10/05/2025',
    },
    {
      cliente: 'Jose Prado',
      cedula: '1023456852',
      causa: 'Pantalla rota',
      marca: 'Samsung',
      referencia: 'A25',
      hora: '09:40 a.m',
      fecha: '10/05/2025',
    },
    // ... el resto de datos
  ];

  return (
    <div className="tecnico-container">
      <h2 className="titulo">Técnico</h2>
      
      <div className="tabs">
        <span className="tab activo">Citas</span>
        <span className="tab">Reparados</span>
        <span className="tab">Garantía</span>
        <span className="tab">Reclamos&Felicitaciones</span>
      </div>

      <div className="filtros">
        <select name="causa" value={filters.causa} onChange={handleChange}>
          <option value="">Causa / Daño</option>
          <option value="Pantalla rota">Pantalla rota</option>
          <option value="Batería">Batería</option>
        </select>
        <input type="text" name="fecha" placeholder="Fecha" value={filters.fecha} onChange={handleChange} />
        <select name="marca" value={filters.marca} onChange={handleChange}>
          <option value="">Marca</option>
          <option value="Samsung">Samsung</option>
          <option value="Xiaomi">Xiaomi</option>
        </select>
        <input type="text" name="referencia" placeholder="Referencia" value={filters.referencia} onChange={handleChange} />
        <button className="btn limpiar" onClick={handleLimpiar}>Limpiar</button>
        <button className="btn consultar" onClick={handleConsultar}>Consultar</button>
      </div>

      <table className="tabla">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Cédula</th>
            <th>Causa / Daño</th>
            <th>Marca</th>
            <th>Referencia</th>
            <th>Hora</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((item, index) => (
            <tr key={index}>
              <td>{item.cliente}</td>
              <td>{item.cedula}</td>
              <td>{item.causa}</td>
              <td>{item.marca}</td>
              <td>{item.referencia}</td>
              <td>{item.hora}</td>
              <td>{item.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tecnico;
