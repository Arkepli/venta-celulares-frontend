import React, { useState } from 'react';
import './Brands.css';

const Brands = () => {
  const [filters, setFilters] = useState({
    marca: '',
    pais: '',
    fecha: '',
    industria: '',
    empresa: '',
    acciones: '',
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleLimpiar = () => {
    setFilters({ marca: '', pais: '', fecha: '', industria: '', empresa: '', acciones: ''});
  };

  const handleConsultar = () => {
    console.log('Consultando con filtros:', filters);
  };

  const handleEditar = (item) => {
    console.log('Editar:', item);
  };
  
  const handleEliminar = (item) => {
    console.log('Eliminar:', item);
  };
  const brands = [
    {
      marca: 'Samsung',
      pais: 'Corea del Sur',
      industria: 'Samsung inc.',
      empresa:  'ID PLUS',
      fecha: '10/05/2025',
      acciones: ''
    },
    {
      marca: 'Apple',
      pais: 'Estados Unidos',
      industria: 'Apple on.',
      empresa:  'ID STORE',
      fecha: '09/05/2025',
      acciones: ''
    },
    {
      marca: 'Xiaomi',
      pais: 'China',
      industria: 'Xiaomi inc.',
      empresa:  'ID PLUS',
      fecha: '08/05/2025',
      acciones: ''
    },
  ];

  return (
    <div className="brands-container">
      <h2 className="titulo">Marcas</h2>

      <div className="filtros">
        <input
          type="text"
          name="marca"
          placeholder="Marcas"
          value={filters.marca}
          onChange={handleChange}
        />
        <input
          type="text"
          name="pais"
          placeholder="País"
          value={filters.pais}
          onChange={handleChange}
        />
        <input
          type="text"
          name="empresa"
          placeholder="Empresa"
          value={filters.empresa}
          onChange={handleChange}
        />
        <button className="btn limpiar" onClick={handleLimpiar}>Limpiar</button>
        <button className="btn consultar" onClick={handleConsultar}>Consultar</button>
      </div>

      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>País</th>
            <th>Industria</th>
            <th>Empresa</th>
            <th>Fecha de Fabricación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((item, index) => (
            <tr key={index}>
              <td>{item.marca}</td>
              <td>{item.pais}</td>
              <td>{item.industria}</td>
              <td>{item.empresa}</td>
              <td>{item.fecha}</td>
              <td><button className="btn editar" onClick={() => handleEditar(item)}>Editar</button>
              <button className="btn eliminar" onClick={() => handleEliminar(item)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Brands;
