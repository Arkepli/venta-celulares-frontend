import React, { useState, useEffect } from "react";
import "./Sale.css";

const API_URL = `${process.env.REACT_APP_API_URL}/ventas`;
const CELULARES_API_URL = `${process.env.REACT_APP_API_URL}/celulares`;

export default function Sale() {
  const [form, setForm] = useState({
    cliente: "",
    cedula: "",
    telefono: "",
    celular: "",
    cantidad: "",
  });
  const [ventas, setVentas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [celulares, setCelulares] = useState([]);

  const fetchVentas = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setVentas(data);
  };

  // Obtener celulares para el dropdown
  const fetchCelulares = async () => {
    try {
      const res = await fetch(CELULARES_API_URL);
      const data = await res.json();
      setCelulares(data);
    } catch (err) {
      setCelulares([]);
    }
  };

  useEffect(() => {
    fetchVentas();
    fetchCelulares();
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
      !form.cedula ||
      !form.telefono ||
      !form.celular ||
      !form.cantidad
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
      if (!res.ok) throw new Error("Error al agregar la venta");
      setForm({
        cliente: "",
        cedula: "",
        telefono: "",
        celular: "",
        cantidad: "",
      });
      fetchVentas();
    } catch (err) {
      alert("No se pudo agregar la venta.");
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchVentas();
  };

  const handleEdit = (venta) => {
    setEditingId(venta._id);
    setEditForm({ ...venta });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async (id) => {
    if (
      !editForm.cliente ||
      !editForm.cedula ||
      !editForm.telefono ||
      !editForm.celular ||
      !editForm.cantidad
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
      if (!res.ok) throw new Error("Error al editar la venta");
      setEditingId(null);
      setEditForm({});
      fetchVentas();
    } catch (err) {
      alert("No se pudo editar la venta.");
    }
  };

  const handleView = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    setSelectedVenta(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVenta(null);
  };

  return (
    <div className="tecnico-container">
      <h2 className="titulo">GESTIÓN DE VENTAS</h2>
      <form onSubmit={handleSubmit} className="form-agregar-celular">
        <div className="row g-3 align-items-end">
          <div className="col-md-2">
            <label className="form-label">Nombre del Cliente</label>
            <input
              className="form-control"
              name="cliente"
              value={form.cliente}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Cédula</label>
            <input
              className="form-control"
              name="cedula"
              value={form.cedula}
              onChange={handleChange}
              placeholder="Ej: 1234567890"
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
          <div className="col-md-3">
            <label className="form-label">Celular vendido</label>
            <select
              className="form-control"
              name="celular"
              value={form.celular}
              onChange={handleChange}
            >
              <option value="">Seleccione un celular</option>
              {celulares.map((c) => (
                <option key={c._id} value={c.reference}>
                  {c.reference}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Cantidad</label>
            <input
              className="form-control"
              name="cantidad"
              type="number"
              value={form.cantidad}
              onChange={handleChange}
              min={1}
              placeholder="0"
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
            <th>Cédula</th>
            <th>Teléfono</th>
            <th>Celular</th>
            <th>Cantidad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((v) => (
            <tr key={v._id}>
              {editingId === v._id ? (
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
                      name="cedula"
                      value={editForm.cedula}
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
                    <select
                      className="form-control"
                      name="celular"
                      value={editForm.celular}
                      onChange={handleEditChange}
                    >
                      <option value="">Seleccione un celular</option>
                      {celulares.map((c) => (
                        <option key={c._id} value={c.reference}>
                          {c.reference}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="cantidad"
                      type="number"
                      value={editForm.cantidad}
                      onChange={handleEditChange}
                      min={1}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      onClick={() => handleSaveEdit(v._id)}
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
                  <td>{v.cliente}</td>
                  <td>{v.cedula}</td>
                  <td>{v.telefono}</td>
                  <td>{v.celular}</td>
                  <td>{v.cantidad}</td>
                  <td>
                    <button
                      title="Ver"
                      className="btn btn-link p-0 me-2"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleView(v._id)}
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
                      onClick={() => handleEdit(v)}
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
                      onClick={() => handleDelete(v._id)}
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
      {showModal && selectedVenta && (
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
            <h4>Detalle de la Venta</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <b>Cliente:</b> {selectedVenta.cliente}
              </li>
              <li>
                <b>Cédula:</b> {selectedVenta.cedula}
              </li>
              <li>
                <b>Teléfono:</b> {selectedVenta.telefono}
              </li>
              <li>
                <b>Celular vendido:</b> {selectedVenta.celular}
              </li>
              <li>
                <b>Cantidad:</b> {selectedVenta.cantidad}
              </li>
              <li>
                <b>ID:</b> {selectedVenta._id}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
