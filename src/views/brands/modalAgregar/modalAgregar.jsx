import React, { useState } from 'react';
import './Modal.css';


const ModalAgregar = ({ onClose, onAgregar }) => {
  const [nuevaMarca, setNuevaMarca] = useState({
    marca: '',
    pais: '',
    industria: '',
    empresa: '',
    fecha: '',
  });

  const handleChange = (e) => {
    setNuevaMarca({ ...nuevaMarca, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAgregar(nuevaMarca);
  };

  return (
    <div className="contenedor-formulario">
    <div className="modal">
      <h2>Agregar Marca</h2>
      <input type="text" name="marca" placeholder="Marca" onChange={handleChange} />
      <input type="text" name="pais" placeholder="País" onChange={handleChange} />
      <input type="text" name="industria" placeholder="Industria" onChange={handleChange} />
      <input type="text" name="empresa" placeholder="Empresa" onChange={handleChange} />
      <input type="date" name="fecha" onChange={handleChange} />
      <button onClick={handleSubmit}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
    </div>
  );
};

export default ModalAgregar;
