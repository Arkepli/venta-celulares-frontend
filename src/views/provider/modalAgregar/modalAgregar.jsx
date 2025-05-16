import React, { useState } from 'react';
import './Modal.css';


const ModalAgregarPro = ({ onClose, onAgregar }) => {
  const [nuevaProveedor, setNuevaProveedor] = useState({
    producto: '',
    proveedor: '',
    cantidad: '',
    valor_unidad: '',
    valor_total: '',
    n_factura: '',
    fecha: '',
    saldo: '',
  });

  const handleChange = (e) => {
    setNuevaProveedor({ ...nuevaProveedor, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAgregar(nuevaProveedor);
  };

  return (
    <div className="contenedor-formulario">
    <div className="modal">
      <h2>Agregar Proveedor</h2>
      <input type="text" name="producto" placeholder="Producto" onChange={handleChange} />
      <input type="text" name="proveedor" placeholder="Proveedor" onChange={handleChange} />
      <input type="text" name="cantidad" placeholder="Cantidad" onChange={handleChange} />
      <input type="text" name="unidad" placeholder="Valor Unidad" onChange={handleChange} />
      <input type="text" name="total" placeholder="Valor Total" onChange={handleChange} />
      <input type="text" name="factura" placeholder="N° Factura" onChange={handleChange} />
      <input type="date" name="fecha" onChange={handleChange} />
      <input type="text" name="saldo" placeholder="Saldo" onChange={handleChange} />
      <button onClick={handleSubmit}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
    </div>
  );
};

export default ModalAgregarPro;
