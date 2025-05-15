import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./cliente.css";

export default function Cliente() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    cedula: "",
    telefono: "",
    email: "",
    direccion: "",
  });
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
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
    setClientes([...clientes, form]);
    setForm({
      nombre: "",
      cedula: "",
      telefono: "",
      email: "",
      direccion: "",
    });
    setError("");
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
    setClientes(clientes.filter((_, i) => i !== idx));
  };

  return (
    <div className="cliente-container">
      <h3>Gestión de Clientes</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Nombre completo *</label>
          <input
            className="form-control"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre del cliente"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Cédula *</label>
          <input
            className="form-control"
            name="cedula"
            value={form.cedula}
            onChange={handleChange}
            placeholder="Cédula"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Teléfono *</label>
          <input
            className="form-control"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Email *</label>
          <input
            className="form-control"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Dirección *</label>
          <input
            className="form-control"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            placeholder="Dirección"
          />
        </div>
        <div className="col-12 d-flex gap-2">
          <button className="btn btn-success" type="submit">
            Agregar
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleClear}
          >
            Limpiar
          </button>
        </div>
        {error && (
          <div className="col-12">
            <div className="alert alert-danger py-1">{error}</div>
          </div>
        )}
      </form>

      <hr />

      <div className="table-responsive">
        <table className="table table-striped mt-4">
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
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(idx)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
            <button
              className="btn btn-primary btn-home"
              onClick={() => navigate("/")}
            >
              Regresar
            </button>
          </tbody>
        </table>
      </div>
    </div>
  );
}
