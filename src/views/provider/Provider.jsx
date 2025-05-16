import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Provider.css";

const Provider = () => {
  const navigate = useNavigate();
  const [proveedor, setProveedor] = useState("");
  const [saldo, setSaldo] = useState("");
  const [data, setData] = useState([
    {
      producto: "Parlante Martech M021",
      proveedor: "Martech",
      cantidad: 5,
      unidad: 24500,
      total: 122500,
      factura: "M-0124532",
      fecha: "08/04/2025",
      saldo: "Pendiente",
    },
    {
      producto: "Audífonos cable E312",
      proveedor: "EKOT",
      cantidad: 15,
      unidad: 6500,
      total: 97500,
      factura: "E-01247853",
      fecha: "08/07/2024",
      saldo: "Pagado",
    },
    {
      producto: "Airpods Max",
      proveedor: "EKOT",
      cantidad: 4,
      unidad: 110000,
      total: 440000,
      factura: "E-01247853",
      fecha: "08/07/2024",
      saldo: "Pendiente",
    },
    {
      producto: "Aros de luz",
      proveedor: "Martech",
      cantidad: 3,
      unidad: 36142,
      total: 108426,
      factura: "M-0124532",
      fecha: "08/07/2024",
      saldo: "Pagado",
    },
    {
      producto: "Airpods Pro2gener",
      proveedor: "Daicom",
      cantidad: 8,
      unidad: 56425,
      total: 451400,
      factura: "D-1452014",
      fecha: "08/07/2024",
      saldo: "Pagado",
    },
    {
      producto: "Cable TC E548",
      proveedor: "EKOT",
      cantidad: 24,
      unidad: 3450,
      total: 82800,
      factura: "E-01247853",
      fecha: "08/07/2024",
      saldo: "Pagado",
    },
    {
      producto: "Cargador TC Samsung",
      proveedor: "WS",
      cantidad: 9,
      unidad: 12500,
      total: 112500,
      factura: "W-14250324",
      fecha: "08/07/2024",
      saldo: "Pagado",
    },
    {
      producto: "Estuche de Lujo",
      proveedor: "CaseBoom",
      cantidad: 35,
      unidad: 15000,
      total: 525000,
      factura: "Case-09102020",
      fecha: "08/07/2024",
      saldo: "Pagado",
    },
  ]);

  const handleLimpiar = () => {
    setProveedor("");
    setSaldo("");
  };

  const filteredData = data.filter(
    (item) =>
      (!proveedor || item.proveedor === proveedor) &&
      (!saldo || item.saldo === saldo)
  );

  return (
    <div className="provider-container">
      <h1 className="provider-title">Administrador</h1>

      <div className="provider-filters">
        <select
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
          className="provider-select"
        >
          <option value="">Proveedor</option>
          <option value="Martech">Martech</option>
          <option value="EKOT">EKOT</option>
          <option value="Daicom">Daicom</option>
          <option value="WS">WS</option>
          <option value="CaseBoom">CaseBoom</option>
        </select>

        <select
          value={saldo}
          onChange={(e) => setSaldo(e.target.value)}
          className="provider-select"
        >
          <option value="">Saldo</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Pagado">Pagado</option>
        </select>

        <button onClick={handleLimpiar} className="provider-button">
          Limpiar
        </button>
      </div>

      <div className="provider-table-container">
        <table className="provider-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Proveedor</th>
              <th>Cantidad</th>
              <th>Valor Unidad</th>
              <th>Valor Total</th>
              <th>N° Factura</th>
              <th>Fecha</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={idx}>
                <td>{item.producto}</td>
                <td>{item.proveedor}</td>
                <td>{item.cantidad}</td>
                <td>{item.unidad.toLocaleString()}</td>
                <td>{item.total.toLocaleString()}</td>
                <td>{item.factura}</td>
                <td>{item.fecha}</td>
                <td>{item.saldo}</td>
              </tr>
            ))}

            <button
              className="btn btn-success btn-home"
              onClick={() => navigate("/")}
            >
              Regresar
            </button>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Provider;
