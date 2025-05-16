import React, { useState } from 'react';
import './Brands.css';
import ModalAgregar from './modalAgregar/modalAgregar';
import ModalEditar from './modalEditar/modalEditar';

const Brands = () => {
  const [filters, setFilters] = useState({
    marca: '',
    pais: '',
    empresa: '',
  });

  const [brands, setBrands] = useState([
    {
      marca: 'Samsung',
      pais: 'Corea del Sur',
      industria: 'Samsung inc.',
      empresa: 'ID PLUS',
      fecha: '10/05/2025',
    },
    {
      marca: 'Apple',
      pais: 'Estados Unidos',
      industria: 'Apple on.',
      empresa: 'ID STORE',
      fecha: '09/05/2025',
    },
    {
      marca: 'Xiaomi',
      pais: 'China',
      industria: 'Xiaomi inc.',
      empresa: 'ID PLUS',
      fecha: '08/05/2025',
    },
  ]);

  const [modalAgregarVisible, setModalAgregarVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleLimpiar = () => {
    setFilters({ marca: '', pais: '', empresa: '' });
  };

  const handleAgregar = (nuevaMarca) => {
    setBrands([nuevaMarca, ...brands]);
    setModalAgregarVisible(false);
  };

  const handleEditar = (marca) => {
    setMarcaSeleccionada(marca);
    setModalEditarVisible(true);
  };

  const handleActualizar = (marcaActualizada) => {
    const actualizadas = brands.map((b) =>
      b === marcaSeleccionada ? marcaActualizada : b
    );
    setBrands(actualizadas);
    setMarcaSeleccionada(null);
    setModalEditarVisible(false);
  };

  const handleEliminar = (marcaAEliminar) => {
    const filtradas = brands.filter((b) => b !== marcaAEliminar);
    setBrands(filtradas);
  };

  // Aplicar filtros
  const marcasFiltradas = brands.filter((item) =>
    item.marca.toLowerCase().includes(filters.marca.toLowerCase()) &&
    item.pais.toLowerCase().includes(filters.pais.toLowerCase()) &&
    item.empresa.toLowerCase().includes(filters.empresa.toLowerCase())
  );

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
        <button className="btn consultar" onClick={() => setModalAgregarVisible(true)}>Agregar</button>
      </div>

      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>País</th>
            <th>Industria</th>
            <th>Empresa</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {marcasFiltradas.map((item, index) => (
            <tr key={index}>
              <td>{item.marca}</td>
              <td>{item.pais}</td>
              <td>{item.industria}</td>
              <td>{item.empresa}</td>
              <td>{item.fecha}</td>
              <td>
                <button className="btn editar" onClick={() => handleEditar(item)}>Editar</button>
                <button className="btn eliminar" onClick={() => handleEliminar(item)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAgregarVisible && (
        <ModalAgregar
          onClose={() => setModalAgregarVisible(false)}
          onAgregar={handleAgregar} 
          // onAgregar={ModalAgregar} 
        />
      )}

      {modalEditarVisible && (
        <ModalEditar
          marca={marcaSeleccionada}
          onClose={() => setModalEditarVisible(false)}
          onActualizar={handleActualizar}
        />
      )}
    </div>
  );
};

export default Brands;
