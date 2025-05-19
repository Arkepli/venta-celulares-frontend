import React, { useState, useEffect } from "react";
import "./Brands.css";

const API_URL = `http://51.210.177.195:8002/marcas`;

export default function Brands() {
  const [form, setForm] = useState({
    nombre: "",
    pais: "",
    industria: "",
    anio: "",
    sitio: "",
  });
  const [brands, setBrands] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const fetchBrands = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setBrands(data);
  };

  useEffect(() => {
    fetchBrands();
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
      !form.pais ||
      !form.industria ||
      !form.anio ||
      !form.sitio
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
      if (!res.ok) throw new Error("Error al agregar la marca");
      setForm({ nombre: "", pais: "", industria: "", anio: "", sitio: "" });
      fetchBrands();
    } catch (err) {
      alert("No se pudo agregar la marca.");
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchBrands();
  };

  const handleEdit = (brand) => {
    setEditingId(brand._id);
    setEditForm({ ...brand });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async (id) => {
    if (
      !editForm.nombre ||
      !editForm.pais ||
      !editForm.industria ||
      !editForm.anio ||
      !editForm.sitio
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
      if (!res.ok) throw new Error("Error al editar la marca");
      setEditingId(null);
      setEditForm({});
      fetchBrands();
    } catch (err) {
      alert("No se pudo editar la marca.");
    }
  };

  const handleView = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    setSelectedBrand(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBrand(null);
  };

  return (
    <div className="tecnico-container">
      <h2 className="titulo">GESTIÓN DE MARCAS</h2>
      <form onSubmit={handleSubmit} className="form-agregar-celular">
        <div className="row g-3 align-items-end">
          <div className="col-md-2">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Samsung"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">País</label>
            <input
              className="form-control"
              name="pais"
              value={form.pais}
              onChange={handleChange}
              placeholder="Ej: Corea del Sur"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Industria</label>
            <input
              className="form-control"
              name="industria"
              value={form.industria}
              onChange={handleChange}
              placeholder="Ej: Electrónica"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Año de fundación</label>
            <input
              className="form-control"
              name="anio"
              type="number"
              value={form.anio}
              onChange={handleChange}
              placeholder="Ej: 1938"
              min={1800}
              max={new Date().getFullYear()}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Sitio web oficial</label>
            <input
              className="form-control"
              name="sitio"
              value={form.sitio}
              onChange={handleChange}
              placeholder="https://www.samsung.com"
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
            <th>Nombre</th>
            <th>País</th>
            <th>Industria</th>
            <th>Año</th>
            <th>Sitio web</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((b) => (
            <tr key={b._id}>
              {editingId === b._id ? (
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
                    <input
                      className="form-control"
                      name="pais"
                      value={editForm.pais}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="industria"
                      value={editForm.industria}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="anio"
                      type="number"
                      value={editForm.anio}
                      onChange={handleEditChange}
                      min={1800}
                      max={new Date().getFullYear()}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="sitio"
                      value={editForm.sitio}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      onClick={() => handleSaveEdit(b._id)}
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
                  <td>{b.nombre}</td>
                  <td>{b.pais}</td>
                  <td>{b.industria}</td>
                  <td>{b.anio}</td>
                  <td>
                    <a href={b.sitio} target="_blank" rel="noopener noreferrer">
                      {b.sitio}
                    </a>
                  </td>
                  <td>
                    <button
                      title="Ver"
                      className="btn btn-link p-0 me-2"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleView(b._id)}
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
                      onClick={() => handleEdit(b)}
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
                      onClick={() => handleDelete(b._id)}
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
      {showModal && selectedBrand && (
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
            <h4>Detalle de la Marca</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <b>Nombre:</b> {selectedBrand.nombre}
              </li>
              <li>
                <b>País:</b> {selectedBrand.pais}
              </li>
              <li>
                <b>Industria:</b> {selectedBrand.industria}
              </li>
              <li>
                <b>Año de fundación:</b> {selectedBrand.anio}
              </li>
              <li>
                <b>Sitio web:</b>{" "}
                <a
                  href={selectedBrand.sitio}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedBrand.sitio}
                </a>
              </li>
              <li>
                <b>ID:</b> {selectedBrand._id}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
