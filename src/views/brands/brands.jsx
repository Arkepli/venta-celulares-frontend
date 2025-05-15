import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function BrandsPage() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([
    "Samsung",
    "Apple",
    "Xiaomi",
    "Huawei",
    "Motorola",
  ]);

  const [newBrand, setNewBrand] = useState("");

  const handleAddBrand = () => {
    if (newBrand && !brands.includes(newBrand)) {
      setBrands([...brands, newBrand]);
      setNewBrand("");
    }
  };

  const handleDelete = (brandToDelete) => {
    setBrands(brands.filter((b) => b !== brandToDelete));
  };

  return (
    <div className="container mt-4">
      <h3>Administrar Marcas</h3>
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          value={newBrand}
          onChange={(e) => setNewBrand(e.target.value)}
          placeholder="Nueva marca"
        />
        <button className="btn btn-primary" onClick={handleAddBrand}>
          Agregar
        </button>
      </div>
      <ul className="list-group">
        {brands.map((brand, idx) => (
          <li
            key={idx}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {brand}
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(brand)}
            >
              Eliminar
            </button>
          </li>
        ))}
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Regresar
        </button>
      </ul>
    </div>
  );
}
