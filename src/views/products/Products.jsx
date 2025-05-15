import React, { useState } from 'react';
import BrandDropdown from '../components/BrandDropdown';
import { initialBrands } from '../data/brandData';

export default function ProductsPage() {
  const [form, setForm] = useState({
    category: 'Celulares',
    brand: '',
    reference: '',
    quantity: '',
    date: ''
  });

  const [products, setProducts] = useState([]);
  const [brands] = useState(initialBrands); // Simulado

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([...products, form]);
    setForm({ category: 'Celulares', brand: '', reference: '', quantity: '', date: '' });
  };

  return (
    <div className="container mt-4">
      <h3>Inventario de Productos</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-3">
          <label className="form-label">Categoría</label>
          <input className="form-control" value={form.category} name="category" onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Marca</label>
          <BrandDropdown
            brands={brands}
            selectedBrand={form.brand}
            onChange={(e) => setForm(prev => ({ ...prev, brand: e.target.value }))}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Referencia</label>
          <input className="form-control" name="reference" value={form.reference} onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <label className="form-label">Cantidad</label>
          <input className="form-control" name="quantity" type="number" value={form.quantity} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Fecha</label>
          <input className="form-control" name="date" type="date" value={form.date} onChange={handleChange} />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-success w-100" type="submit">Agregar</button>
        </div>
      </form>

      <hr />

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Marca</th>
            <th>Referencia</th>
            <th>Cantidad</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, idx) => (
            <tr key={idx}>
              <td>{p.category}</td>
              <td>{p.brand}</td>
              <td>{p.reference}</td>
              <td>{p.quantity}</td>
              <td>{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}