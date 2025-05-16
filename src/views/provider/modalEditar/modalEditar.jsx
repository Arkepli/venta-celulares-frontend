import React, { useState, useEffect } from 'react';
import './Modal.css';


const ModalEditarPro = ({ proveedor, onClose, onActualizar }) => {
  const [proveedorEditada, setProveedorEditada] = useState(proveedor);

  useEffect(() => {
    setProveedorEditada(proveedor);
  }, [proveedor]);

  const handleChange = (e) => {
    setProveedorEditada({ ...proveedorEditada, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onActualizar(proveedorEditada);
  };

  return (
  <div className="modal">
    <h2>Editar Proveedor</h2>
    <div className='acctionModal'>
    <input type="text" name="producto" value={proveedorEditada.producto} onChange={handleChange} />
      <input type="text" name="proveedor" value={proveedorEditada.proveedor} onChange={handleChange} />
      <input type="text" name="cantidad" value={proveedorEditada.cantidad} onChange={handleChange} />
      <input type="text" name="unidad" value={proveedorEditada.unidad} onChange={handleChange} />
      <input type="text" name="total" value={proveedorEditada.total} onChange={handleChange} />
      <input type="text" name="factura" value={proveedorEditada.factura} onChange={handleChange} />
      <input type="date" name="fecha" value={proveedorEditada.fecha} onChange={handleChange} />
      <input type="text" name="saldo" value={proveedorEditada.saldo} onChange={handleChange} />

    </div>
    <div className='btnAction'>
      <button onClick={handleSubmit}>Actualizar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>      
    </div>
  );
};

export default ModalEditarPro;
