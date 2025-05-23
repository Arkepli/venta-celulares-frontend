import React, { useState, useEffect } from "react";
import "./Proveedores.css";

const API_URL = `http://167.114.155.66:8002/proveedores`;

export default function Proveedores() {
  const [form, setForm] = useState({
    razon: "",
    nit: "",
    direccion: "",
    telefono: "",
    producto: "",
  });
  const [proveedores, setProveedores] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  const fetchProveedores = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProveedores(data);
  };

  useEffect(() => {
    fetchProveedores();
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
      !form.razon ||
      !form.nit ||
      !form.direccion ||
      !form.telefono ||
      !form.producto
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
      if (!res.ok) throw new Error("Error al agregar el proveedor");
      setForm({
        razon: "",
        nit: "",
        direccion: "",
        telefono: "",
        producto: "",
      });
      fetchProveedores();
    } catch (err) {
      alert("No se pudo agregar el proveedor.");
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProveedores();
  };

  const handleEdit = (proveedor) => {
    setEditingId(proveedor._id);
    setEditForm({ ...proveedor });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async (id) => {
    if (
      !editForm.razon ||
      !editForm.nit ||
      !editForm.direccion ||
      !editForm.telefono ||
      !editForm.producto
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
      if (!res.ok) throw new Error("Error al editar el proveedor");
      setEditingId(null);
      setEditForm({});
      fetchProveedores();
    } catch (err) {
      alert("No se pudo editar el proveedor.");
    }
  };

  const handleView = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    setSelectedProveedor(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProveedor(null);
  };

  return (
    <div className="tecnico-container">
      <h2 className="titulo">GESTIÓN DE PROVEEDORES</h2>
      <form onSubmit={handleSubmit} className="form-agregar-celular">
        <div className="row g-3 align-items-end">
          <div className="col-md-2">
            <label className="form-label">Razón social</label>
            <input
              className="form-control"
              name="razon"
              value={form.razon}
              onChange={handleChange}
              placeholder="Ej: Proveedor S.A.S."
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">NIT</label>
            <input
              className="form-control"
              name="nit"
              value={form.nit}
              onChange={handleChange}
              placeholder="Ej: 900123456"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Dirección</label>
            <input
              className="form-control"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Ej: Calle 123 #45-67"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Teléfono</label>
            <input
              className="form-control"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Ej: 3001234567"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Producto</label>
            <input
              className="form-control"
              name="producto"
              value={form.producto}
              onChange={handleChange}
              placeholder="Ej: Celulares"
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
            <th>Razón social</th>
            <th>NIT</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Producto</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((p) => (
            <tr key={p._id}>
              {editingId === p._id ? (
                <>
                  <td>
                    <input
                      className="form-control"
                      name="razon"
                      value={editForm.razon}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="nit"
                      value={editForm.nit}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="direccion"
                      value={editForm.direccion}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="telefono"
                      value={editForm.telefono}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="producto"
                      value={editForm.producto}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      onClick={() => handleSaveEdit(p._id)}
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
                  <td>{p.razon}</td>
                  <td>{p.nit}</td>
                  <td>{p.direccion}</td>
                  <td>{p.telefono}</td>
                  <td>{p.producto}</td>
                  <td>
                    <button
                      title="Ver"
                      className="btn btn-link p-0 me-2"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleView(p._id)}
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
                      onClick={() => handleEdit(p)}
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
                      onClick={() => handleDelete(p._id)}
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
      {showModal && selectedProveedor && (
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
            <h4>Detalle del Proveedor</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <b>Razón social:</b> {selectedProveedor.razon}
              </li>
              <li>
                <b>NIT:</b> {selectedProveedor.nit}
              </li>
              <li>
                <b>Dirección:</b> {selectedProveedor.direccion}
              </li>
              <li>
                <b>Teléfono:</b> {selectedProveedor.telefono}
              </li>
              <li>
                <b>Producto:</b> {selectedProveedor.producto}
              </li>
              <li>
                <b>ID:</b> {selectedProveedor._id}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
