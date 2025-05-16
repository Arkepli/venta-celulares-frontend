import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./clientes.css";

export default function Clientes() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    cedula: "",
    telefono: "",
    email: "",
    direccion: "",
  });
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8002/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Error al obtener clientes:", err));
  }, []);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.nombre ||
      !form.cedula ||
      !form.telefono ||
      !form.email ||
      !form.direccion
    ) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    fetch("http://localhost:8002/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((nuevoCliente) => {
        setClientes([...clientes, nuevoCliente]);
        setForm({
          nombre: "",
          cedula: "",
          telefono: "",
          email: "",
          direccion: "",
        });
        setError("");
      })
      .catch(() => setError("Error al agregar cliente."));
  };

  const handleClear = () => {
    setForm({
      nombre: "",
      cedula: "",
      telefono: "",
      email: "",
      direccion: "",
    });
    setError("");
  };

  const handleDelete = (idx) => {
    const clienteAEliminar = clientes[idx];
    fetch(`http://localhost:8002/clientes/${clienteAEliminar._id}`, {
      method: "DELETE",
    })
      .then(() => {
        setClientes(clientes.filter((_, i) => i !== idx));
      })
      .catch(() => setError("Error al eliminar cliente."));
  };

  return (
    <div className="provider-container">
      <h1 className="provider-title">Gestión de Clientes</h1>

      <form onSubmit={handleSubmit} className="row g-3 provider-filters">
        <input
          className="provider-select"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre completo"
        />
        <input
          className="provider-select"
          name="cedula"
          value={form.cedula}
          onChange={handleChange}
          placeholder="Cédula"
        />
        <input
          className="provider-select"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
        />
        <input
          className="provider-select"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
        />
        <input
          className="provider-select"
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          placeholder="Dirección"
        />
        <button type="submit" className="provider-button">
          Agregar
        </button>
        <button type="button" className="provider-button" onClick={handleClear}>
          Limpiar
        </button>
      </form>
      {error && (
        <div className="alert alert-danger py-1" style={{ margin: "10px 0" }}>
          {error}
        </div>
      )}

      <div className="provider-table-container">
        <table className="provider-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  No hay clientes registrados.
                </td>
              </tr>
            ) : (
              clientes.map((c, idx) => (
                <tr key={idx}>
                  <td>{c.nombre}</td>
                  <td>{c.cedula}</td>
                  <td>{c.telefono}</td>
                  <td>{c.email}</td>
                  <td>{c.direccion}</td>
                  <td>
                    <button
                      className="provider-button provider-delete"
                      onClick={() => handleDelete(idx)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button
        className="btn btn-success btn-home"
        onClick={() => navigate("/")}
      >
        Regresar
      </button>
    </div>
  );
}
