import React, { useState } from 'react';
import { initialBrands } from '../data/brandData';

export default function BrandsPage() {
  const [brands, setBrands] = useState(initialBrands);
  const [newBrand, setNewBrand] = useState('');

  const handleAddBrand = () => {
    if (newBrand && !brands.includes(newBrand)) {
      setBrands([...brands, newBrand]);
      setNewBrand('');
    }
  };

  const handleDelete = (brandToDelete) => {
    setBrands(brands.filter(b => b !== brandToDelete));
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
        <button className="btn btn-primary" onClick={handleAddBrand}>Agregar</button>
      </div>
      <ul className="list-group">
        {brands.map((brand, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
            {brand}
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(brand)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}