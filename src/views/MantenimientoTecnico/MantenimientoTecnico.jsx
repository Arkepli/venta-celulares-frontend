import React, { useState, useEffect } from "react";

const API_URL = `http://167.114.155.66:8002/mantenimiento-tecnico`;

export default function MantenimientoTecnico() {
  const [form, setForm] = useState({
    cliente: "",
    celular: "",
    descripcion: "",
    fecha: "",
    tecnico: "",
    notas: "",
  });
  const [mantenimientos, setMantenimientos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedMantenimiento, setSelectedMantenimiento] = useState(null);

  const fetchMantenimientos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setMantenimientos(data);
  };

  useEffect(() => {
    fetchMantenimientos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.cliente ||
      !form.celular ||
      !form.descripcion ||
      !form.fecha ||
      !form.tecnico ||
      !form.notas
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al agregar el mantenimiento");
      setForm({
        cliente: "",
        celular: "",
        descripcion: "",
        fecha: "",
        tecnico: "",
        notas: "",
      });
      fetchMantenimientos();
    } catch (err) {
      alert("No se pudo agregar el mantenimiento.");
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchMantenimientos();
  };

  const handleEdit = (mantenimiento) => {
    setEditingId(mantenimiento._id);
    setEditForm({ ...mantenimiento });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async (id) => {
    if (
      !editForm.cliente ||
      !editForm.celular ||
      !editForm.descripcion ||
      !editForm.fecha ||
      !editForm.tecnico ||
      !editForm.notas
    ) {
      alert("Por favor, completa todos los campos para editar.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Error al editar el mantenimiento");
      setEditingId(null);
      setEditForm({});
      fetchMantenimientos();
    } catch (err) {
      alert("No se pudo editar el mantenimiento.");
    }
  };

  const handleView = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    setSelectedMantenimiento(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMantenimiento(null);
  };

  return (
    <div className="tecnico-container">
      <h2 className="titulo">GESTIÓN DE MANTENIMIENTO TÉCNICO</h2>
      <form onSubmit={handleSubmit} className="form-agregar-celular">
        <div className="row g-3 align-items-end">
          <div className="col-md-2">
            <label className="form-label">Nombre del cliente</label>
            <input
              className="form-control"
              name="cliente"
              value={form.cliente}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Celular</label>
            <input
              className="form-control"
              name="celular"
              value={form.celular}
              onChange={handleChange}
              placeholder="Ej: 3001234567"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Descripción del problema</label>
            <input
              className="form-control"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Ej: No enciende la pantalla"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Fecha de solicitud</label>
            <input
              className="form-control"
              name="fecha"
              type="date"
              value={form.fecha}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Técnico asignado</label>
            <input
              className="form-control"
              name="tecnico"
              value={form.tecnico}
              onChange={handleChange}
              placeholder="Ej: Pedro Gómez"
            />
          </div>
          <div className="col-md-1">
            <label className="form-label">Notas</label>
            <input
              className="form-control"
              name="notas"
              value={form.notas}
              onChange={handleChange}
              placeholder="Notas del cliente"
            />
          </div>
          <div className="col-md-1 d-flex align-items-end">
            <button className="btn w-100" type="submit">
              AGREGAR
            </button>
          </div>
        </div>
      </form>
      <hr />
      <table className="tabla">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Celular</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Técnico</th>
            <th>Notas</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {mantenimientos.map((m) => (
            <tr key={m._id}>
              {editingId === m._id ? (
                <>
                  <td>
                    <input
                      className="form-control"
                      name="cliente"
                      value={editForm.cliente}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="celular"
                      value={editForm.celular}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="descripcion"
                      value={editForm.descripcion}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="fecha"
                      type="date"
                      value={editForm.fecha}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="tecnico"
                      value={editForm.tecnico}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="notas"
                      value={editForm.notas}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      onClick={() => handleSaveEdit(m._id)}
                      title="Guardar"
                    >
                      💾
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleCancelEdit}
                      title="Cancelar"
                    >
                      ✖
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{m.cliente}</td>
                  <td>{m.celular}</td>
                  <td>{m.descripcion}</td>
                  <td>{m.fecha}</td>
                  <td>{m.tecnico}</td>
                  <td>{m.notas}</td>
                  <td>
                    <button
                      title="Ver"
                      className="btn btn-link p-0 me-2"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleView(m._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 0 24 24"
                        width="20"
                        fill="#1976d2"
                      >
                        <path d="M12 6a9.77 9.77 0 0 0-10 6 9.77 9.77 0 0 0 20 0A9.77 9.77 0 0 0 12 6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2z" />
                      </svg>
                    </button>
                    <button
                      title="Editar"
                      className="btn btn-link p-0 me-2"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEdit(m)}
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
                    <button
                      title="Eliminar"
                      className="btn btn-link p-0"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(m._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 0 24 24"
                        width="20"
                        fill="#d11a2a"
                      >
                        <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1z" />
                      </svg>
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && selectedMantenimiento && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 32,
              borderRadius: 8,
              minWidth: 320,
              position: "relative",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "none",
                border: "none",
                fontSize: 22,
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <h4>Detalle del Mantenimiento</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <b>Cliente:</b> {selectedMantenimiento.cliente}
              </li>
              <li>
                <b>Celular:</b> {selectedMantenimiento.celular}
              </li>
              <li>
                <b>Descripción:</b> {selectedMantenimiento.descripcion}
              </li>
              <li>
                <b>Fecha:</b> {selectedMantenimiento.fecha}
              </li>
              <li>
                <b>Técnico:</b> {selectedMantenimiento.tecnico}
              </li>
              <li>
                <b>Notas:</b> {selectedMantenimiento.notas}
              </li>
              <li>
                <b>ID:</b> {selectedMantenimiento._id}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
