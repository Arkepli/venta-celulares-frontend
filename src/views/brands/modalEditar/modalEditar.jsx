import React, { useState, useEffect } from 'react';
import './Modal.css';


const ModalEditar = ({ marca, onClose, onActualizar }) => {
  const [marcaEditada, setMarcaEditada] = useState(marca);

  useEffect(() => {
    setMarcaEditada(marca);
  }, [marca]);

  const handleChange = (e) => {
    setMarcaEditada({ ...marcaEditada, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onActualizar(marcaEditada);
  };

  return (
  <div className="modal">
    <h2>Editar Marca</h2>
    <div className='acctionModal'>
    <input type="text" name="marca" value={marcaEditada.marca} onChange={handleChange} />
      <input type="text" name="pais" value={marcaEditada.pais} onChange={handleChange} />
      <input type="text" name="industria" value={marcaEditada.industria} onChange={handleChange} />
      <input type="text" name="empresa" value={marcaEditada.empresa} onChange={handleChange} />
      <input type="date" name="fecha" value={marcaEditada.fecha} onChange={handleChange} />
    </div>
    <div className='btnAction'>
      <button onClick={handleSubmit}>Actualizar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>      
    </div>
  );
};

export default ModalEditar;
