import React from "react";
import "./Home.css";

const Home = () => {
  // Datos para el carousel (puedes reemplazar con tus productos)
  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: "$1,099",
      image:
        "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      price: "$899",
      image:
        "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      name: "Google Pixel 8",
      price: "$799",
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&auto=format&fit=crop&w=1468&q=80",
    },
    {
      id: 4,
      name: "Xiaomi 13 Pro",
      price: "$999",
      image:
        "https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  // Datos para el grid de imágenes
  const imageGrid = [
    {
      id: 1,
      title: "Tecnología Innovadora",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "Diseño Premium",
      image:
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      title: "Cámaras Profesionales",
      image:
        "https://images.unsplash.com/photo-1605170439002-90845e8c0137?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 4,
      title: "Batería de Larga Duración",
      image:
        "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  return (
    <div className="phone-store-home">
      {/* Hero Banner Horizontal */}
      <section className="hero-banner">
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <h1>Descubre la próxima generación de smartphones</h1>
          <p>Tecnología de punta en tus manos</p>
          <div className="hero-cta">
            <a href="#novedades" className="cta-primary">
              Ver novedades
            </a>
            <a href="#ofertas" className="cta-secondary">
              Ofertas exclusivas
            </a>
          </div>
        </div>
      </section>

      {/* Carousel de Productos Destacados */}
      <section className="featured-carousel">
        <h2>Productos Destacados</h2>
        <div className="carousel-container">
          <div className="carousel-track">
            {featuredProducts.map((product) => (
              <div key={product.id} className="carousel-slide">
                <img src={product.image} alt={product.name} />
                <div className="slide-info">
                  <h3>{product.name}</h3>
                  <p className="price">{product.price}</p>
                  <button className="view-btn">Ver detalles</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Imágenes Moderno */}
      <section className="image-grid-section">
        <h2>Explora Nuestro Mundo</h2>
        <div className="image-grid">
          {imageGrid.map((item) => (
            <div key={item.id} className="grid-item">
              <img src={item.image} alt={item.title} />
              <div className="grid-overlay">
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Innovador */}
      <footer className="innovative-footer">
        <div className="footer-container">
          {/* Sección Superior del Footer */}
          <div className="footer-top">
            {/* Columna Logo y Descripción */}
            <div className="footer-column logo-column">
              <div className="footer-logo">
                <span className="logo-part-1">Tech</span>
                <span className="logo-part-2">Mobile</span>
              </div>
              <p className="footer-description">
                Líderes en tecnología móvil. Ofrecemos los últimos dispositivos
                con garantía y soporte premium.
              </p>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            {/* Columna Enlaces Rápidos */}
            <div className="footer-column">
              <h3 className="footer-title">Comprar</h3>
              <ul className="footer-links">
                <li>
                  <a href="#">Todos los modelos</a>
                </li>
                <li>
                  <a href="#">Últimos lanzamientos</a>
                </li>
                <li>
                  <a href="#">Ofertas especiales</a>
                </li>
                <li>
                  <a href="#">Accesorios</a>
                </li>
                <li>
                  <a href="#">Comparar modelos</a>
                </li>
              </ul>
            </div>

            {/* Columna Soporte */}
            <div className="footer-column">
              <h3 className="footer-title">Soporte</h3>
              <ul className="footer-links">
                <li>
                  <a href="#">Centro de ayuda</a>
                </li>
                <li>
                  <a href="#">Garantías</a>
                </li>
                <li>
                  <a href="#">Estado de pedidos</a>
                </li>
                <li>
                  <a href="#">Financiación</a>
                </li>
                <li>
                  <a href="#">Contacto</a>
                </li>
              </ul>
            </div>

            {/* Columna Newsletter */}
            <div className="footer-column newsletter-column">
              <h3 className="footer-title">Mantente conectado</h3>
              <p>
                Suscríbete para recibir ofertas exclusivas y novedades
                tecnológicas.
              </p>
              <form className="newsletter-form">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  required
                />
                <button type="submit">
                  <i className="fas fa-paper-plane"></i> Suscribirse
                </button>
              </form>
            </div>
          </div>

          {/* Sección Inferior del Footer */}
          <div className="footer-bottom">
            <div className="payment-methods">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-amex"></i>
              <i className="fab fa-cc-paypal"></i>
            </div>
            <div className="legal-links">
              <a href="#">Términos y condiciones</a>
              <a href="#">Política de privacidad</a>
              <a href="#">Aviso legal</a>
            </div>
            <div className="copyright">
              © {new Date().getFullYear()} TechMobile. Todos los derechos
              reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
