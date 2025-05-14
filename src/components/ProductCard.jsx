import './ProductCard.css';

export default function ProductCard({ producto }) {
  return (
    <div className="card" style={{ width: '200px' }}>
      <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%' }} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p><strong>${producto.precio.toLocaleString()}</strong></p>
      <button>Comprar</button>
    </div>
  );
}


/*export default function ProductCard({ producto }) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
        <h4>{producto.nombre}</h4>
        <p>{producto.descripcion}</p>
        <p><strong>${producto.precio}</strong></p>
        <button>Agregar al carrito</button>
      </div>
    );
  }*/
  