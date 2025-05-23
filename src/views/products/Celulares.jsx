import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Celulares.css";

export default function ProductsPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    category: "Celulares",
    brand: "",
    reference: "",
    quantity: "",
    price: "",
    color: "",
  });
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCelular, setSelectedCelular] = useState(null);

  // Backend URL
  const API_URL = `http://167.114.155.66:8002/celulares`;
  const BRANDS_API_URL = `http://167.114.155.66:8002/marcas`;

  // Fetch all celulares
  const fetchProducts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProducts(data);
  };

  // Fetch brands from backend
  const fetchBrands = async () => {
    try {
      const res = await fetch(BRANDS_API_URL);
      const data = await res.json();
      setBrands(data);
    } catch (err) {
      setBrands([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchBrands();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add new celular
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.brand ||
      !form.reference ||
      !form.quantity ||
      !form.price ||
      !form.color
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
      if (!res.ok) throw new Error("Error al agregar el celular");
      setForm({
        category: "Celulares",
        brand: "",
        reference: "",
        quantity: "",
        price: "",
        color: "",
      });
      fetchProducts();
    } catch (err) {
      alert("No se pudo agregar el celular.");
    }
  };

  // Delete celular
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  // Start editing
  const handleEdit = (celular) => {
    setEditingId(celular._id);
    setEditForm({ ...celular });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Save edit
  const handleSaveEdit = async (id) => {
    // Validar que no haya campos vacíos
    if (
      !editForm.brand ||
      !editForm.reference ||
      !editForm.quantity ||
      !editForm.price ||
      !editForm.color
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
      if (!res.ok) throw new Error("Error al editar el celular");
      setEditingId(null);
      setEditForm({});
      fetchProducts();
    } catch (err) {
      alert("No se pudo editar el celular.");
    }
  };

  // Ver detalle de un celular
  const handleView = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    setSelectedCelular(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCelular(null);
  };

  return (
    <div className="tecnico-container">
      <h2 className="titulo">INVENTARIO DE CELULARES</h2>
      <form onSubmit={handleSubmit} className="form-agregar-celular">
        <div className="row g-3 align-items-end">
          <div className="col-md-2">
            <label className="form-label">Categoría</label>
            <input
              className="form-control"
              value={form.category}
              name="category"
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Marca</label>
            <select
              className="form-select"
              name="brand"
              value={form.brand}
              onChange={handleChange}
            >
              <option value="">Seleccione una marca</option>
              {brands.map((b) => (
                <option key={b._id} value={b.nombre}>
                  {b.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Referencia</label>
            <input
              className="form-control"
              name="reference"
              value={form.reference}
              onChange={handleChange}
              placeholder="Ej: Galaxy S24 Ultra"
            />
          </div>
          <div className="col-md-1">
            <label className="form-label">Cantidad</label>
            <input
              className="form-control"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              min={1}
              placeholder="0"
            />
          </div>
          <div className="col-md-1">
            <label className="form-label">Precio</label>
            <input
              className="form-control"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              min={0}
              placeholder="$"
            />
          </div>
          <div className="col-md-1">
            <label className="form-label">Color</label>
            <input
              className="form-control"
              name="color"
              value={form.color}
              onChange={handleChange}
              placeholder="Ej: Negro"
            />
          </div>
          <div className="col-md-1 d-flex">
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
            <th>Categoría</th>
            <th>Marca</th>
            <th>Referencia</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Color</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              {editingId === p._id ? (
                <>
                  <td>
                    <input
                      className="form-control"
                      name="category"
                      value={editForm.category}
                      onChange={handleEditChange}
                      readOnly
                    />
                  </td>
                  <td>
                    <select
                      className="form-select"
                      name="brand"
                      value={editForm.brand}
                      onChange={handleEditChange}
                    >
                      <option value="">Seleccione una marca</option>
                      {brands.map((b) => (
                        <option key={b._id} value={b.nombre}>
                          {b.nombre}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="reference"
                      value={editForm.reference}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="quantity"
                      type="number"
                      value={editForm.quantity}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="price"
                      type="number"
                      value={editForm.price}
                      onChange={handleEditChange}
                    />
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
                  <td>{p.category}</td>
                  <td>{p.brand}</td>
                  <td>{p.reference}</td>
                  <td>{p.quantity}</td>
                  <td>{p.price}</td>
                  <td>{p.color}</td>
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

      {/* Modal para ver detalle */}
      {showModal && selectedCelular && (
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
            <h4>Detalle del Celular</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <b>Categoría:</b> {selectedCelular.category}
              </li>
              <li>
                <b>Marca:</b> {selectedCelular.brand}
              </li>
              <li>
                <b>Referencia:</b> {selectedCelular.reference}
              </li>
              <li>
                <b>Cantidad:</b> {selectedCelular.quantity}
              </li>
              <li>
                <b>Precio:</b> {selectedCelular.price}
              </li>
              <li>
                <b>Color:</b> {selectedCelular.color}
              </li>
              <li>
                <b>ID:</b> {selectedCelular._id}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
