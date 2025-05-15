import React from 'react';

export default function BrandDropdown({ brands, selectedBrand, onChange }) {
  return (
    <select className="form-select" value={selectedBrand} onChange={onChange}>
      <option value="">Selecciona una marca</option>
      {brands.map((brand, idx) => (
        <option key={idx} value={brand}>{brand}</option>
      ))}
    </select>
  );
}