import React, { useState, useEffect } from "react";
import "./Accesorios.css";

const API_URL = `${process.env.REACT_APP_API_URL}/accesorios`;
const MARCAS_API_URL = `${process.env.REACT_APP_API_URL}//marcas`;

export default function Accesorios() {
  const [form, setForm] = useState({
    nombre: "",
    marca: "",
    color: "",
    precio: "",
    peso: "",
  });
  const [accesorios, setAccesorios] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedAccesorio, setSelectedAccesorio] = useState(null);
  const [marcas, setMarcas] = useState([]);

  const fetchAccesorios = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setAccesorios(data);
  };

  // Obtener marcas para el dropdown
  const fetchMarcas = async () => {
    try {
      const res = await fetch(MARCAS_API_URL);
      const data = await res.json();
      setMarcas(data);
    } catch (err) {
      setMarcas([]);
    }
  };

  useEffect(() => {
    fetchAccesorios();
    fetchMarcas();
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
      !form.nombre ||
      !form.marca ||
      !form.color ||
      !form.precio ||
      !form.peso
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
      if (!res.ok) throw new Error("Error al agregar el accesorio");
      setForm({ nombre: "", marca: "", color: "", precio: "", peso: "" });
      fetchAccesorios();
    } catch (err) {
      alert("No se pudo agregar el accesorio.");
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchAccesorios();
  };

  const handleEdit = (accesorio) => {
    setEditingId(accesorio._id);
    setEditForm({ ...accesorio });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async (id) => {
    if (
      !editForm.nombre ||
      !editForm.marca ||
      !editForm.color ||
      !editForm.precio ||
      !editForm.peso
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
      if (!res.ok) throw new Error("Error al editar el accesorio");
      setEditingId(null);
      setEditForm({});
      fetchAccesorios();
    } catch (err) {
      alert("No se pudo editar el accesorio.");
    }
  };

  const handleView = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    setSelectedAccesorio(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAccesorio(null);
  };

  return (
    <div className="tecnico-container">
      <h2 className="titulo">GESTIÓN DE ACCESORIOS</h2>
      <form onSubmit={handleSubmit} className="form-agregar-celular">
        <div className="row g-3 align-items-end">
          <div className="col-md-2">
            <label className="form-label">Nombre del accesorio</label>
            <input
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Cargador USB"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Marca</label>
            <select
              className="form-control"
              name="marca"
              value={form.marca}
              onChange={handleChange}
            >
              <option value="">Seleccione una marca</option>
              {marcas.map((m) => (
                <option key={m._id} value={m.nombre}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Color</label>
            <input
              className="form-control"
              name="color"
              value={form.color}
              onChange={handleChange}
              placeholder="Ej: Negro"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Precio</label>
            <input
              className="form-control"
              name="precio"
              type="number"
              value={form.precio}
              onChange={handleChange}
              min={0}
              placeholder="$"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Peso</label>
            <input
              className="form-control"
              name="peso"
              type="number"
              value={form.peso}
              onChange={handleChange}
              min={0}
              placeholder="g"
            />
          </div>
          <div className="col-md-2 d-flex align-items-end">
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
            <th>Nombre</th>
            <th>Marca</th>
            <th>Color</th>
            <th>Precio</th>
            <th>Peso</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {accesorios.map((a) => (
            <tr key={a._id}>
              {editingId === a._id ? (
                <>
                  <td>
                    <input
                      className="form-control"
                      name="nombre"
                      value={editForm.nombre}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <select
                      className="form-control"
                      name="marca"
                      value={editForm.marca}
                      onChange={handleEditChange}
                    >
                      <option value="">Seleccione una marca</option>
                      {marcas.map((m) => (
                        <option key={m._id} value={m.nombre}>
                          {m.nombre}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="color"
                      value={editForm.color}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="precio"
                      type="number"
                      value={editForm.precio}
                      onChange={handleEditChange}
                      min={0}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="peso"
                      type="number"
                      value={editForm.peso}
                      onChange={handleEditChange}
                      min={0}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      onClick={() => handleSaveEdit(a._id)}
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
                  <td>{a.nombre}</td>
                  <td>{a.marca}</td>
                  <td>{a.color}</td>
                  <td>{a.precio}</td>
                  <td>{a.peso}</td>
                  <td>
                    <button
                      title="Ver"
                      className="btn btn-link p-0 me-2"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleView(a._id)}
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
                      onClick={() => handleEdit(a)}
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
                      onClick={() => handleDelete(a._id)}
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
      {showModal && selectedAccesorio && (
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
            <h4>Detalle del Accesorio</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <b>Nombre:</b> {selectedAccesorio.nombre}
              </li>
              <li>
                <b>Marca:</b> {selectedAccesorio.marca}
              </li>
              <li>
                <b>Color:</b> {selectedAccesorio.color}
              </li>
              <li>
                <b>Precio:</b> {selectedAccesorio.precio}
              </li>
              <li>
                <b>Peso:</b> {selectedAccesorio.peso}
              </li>
              <li>
                <b>ID:</b> {selectedAccesorio._id}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
