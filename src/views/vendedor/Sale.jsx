import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sale.css";

const Sale = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    causa: "",
    fecha: "",
    marca: "",
    referencia: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleLimpiar = () => {
    setFilters({ causa: "", fecha: "", marca: "", referencia: "" });
  };

  const handleConsultar = () => {
    // Aquí iría la lógica de filtro
    console.log("Consultando con filtros:", filters);
  };

  const citas = [
    {
      producto: "AirPods A9",
      factor: "45.000",
      referencia: "A9-Pro-V2",
      precio: "$150.000",
      cantidad: "57",
      fecha: "14/05/2025",
      accion: "",
    },
    {
      producto: "AirPods Clon A9 Pro",
      factor: "Par",
      referencia: "A9-Pro-V2",
      precio: "$25.000",
      cantidad: "82",
      fecha: "	05/06/2024",
      accion: "",
    },
    {
      producto: "Auriculares A9 Negro",
      factor: "Unidad",
      referencia: "A9-TWS-Black",
      precio: "$20.000",
      cantidad: "82",
      fecha: "12/06/2024",
      accion: "",
    },
    {
      producto: "A9 TWS con LED",
      factor: "Par",
      referencia: "A9-LED-2024",
      precio: "$22.500",
      cantidad: "82",
      fecha: "08/06/2024",
      accion: "",
    },
    {
      producto: "Auriculares A9 Blanco",
      factor: "Unidad",
      referencia: "A9-TWS-White",
      precio: "$19.800",
      cantidad: "82",
      fecha: "14/06/2024",
      accion: "",
    },
    {
      producto: "A9 Pro Plus (ANC)",
      factor: "Par",
      referencia: "A9-ProPlus-ANC",
      precio: "$35.000",
      cantidad: "82",
      fecha: "01/06/2024",
      accion: "",
    },
    // ... el resto de datos
  ];

  return (
    <div className="tecnico-container">
      <h2 className="titulo">Ventas</h2>

      <div className="filtros">
        <div class="saleFiltros">
          <div class="saleWrapper">
            <label>Producto</label>
            <select name="causa" value={filters.causa} onChange={handleChange}>
              <option value="">--Elegir producto--</option>
              <option value="Pantalla rota">Pantalla rota</option>
              <option value="Batería">Batería</option>
              <option value="Batería">Cargador original Samsung 25W</option>
            </select>
          </div>
          <div class="saleWrapper">
            <label>Cantidad</label>
            <input type="text" placeholder="Cantidad" />
          </div>
          <div class="saleWrapper">
            <label>Fecha</label>
            <input type="date" />
          </div>
        </div>
        <div class="saleAcction">
          <button className="btn limpiar" onClick={handleLimpiar}>
            Limpiar
          </button>
          <button className="btn consultar" onClick={handleConsultar}>
            Agregar
          </button>
        </div>
      </div>

      <table className="tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Factor</th>
            <th>Referencia</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((item, index) => (
            <tr key={index}>
              <td>{item.producto}</td>
              <td>{item.factor}</td>
              <td>{item.referencia}</td>
              <td>{item.precio}</td>
              <td>{item.cantidad}</td>
              <td>{item.fecha}</td>
              <td>
                <button
                  title="Editar"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                    fill="#000000"
                  >
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.83z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
          <button
            className="btn btn-primary btn-home"
            onClick={() => navigate("/")}
          >
            Volver a Home
          </button>
        </tbody>
      </table>
    </div>
  );
};

export default Sale;
