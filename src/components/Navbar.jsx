import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";
import { FaUserCircle, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigate = (path) => {
    console.log("Navegando a:", path);
    navigate(path);
    setIsOpen(false); // opcional: cerrar el menú si está en móvil
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img onClick={() => handleNavigate("/")} src={logo} alt="Logo" className="logo" style={{ width: "95px" }} />
        <button className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>
        <li onClick={() => handleNavigate("/celulares")}>CELULARES</li>
        <li onClick={() => handleNavigate("/ventas")}>VENTAS</li>
        <li onClick={() => handleNavigate("/accesorios")}>ACCESORIOS</li>
        <li onClick={() => handleNavigate("/brands")}>MARCAS</li>
        <li onClick={() => handleNavigate("/mantenimiento-tecnico")}>MANTENIMIENTO TÉCNICO</li>
        <li onClick={() => handleNavigate("/proveedores")}>PROVEEDORES</li>
      </ul>

      <div className="navbar-right">
        <div className="nav-item">
          <FaUserCircle />
          <span>Jesus Garcia</span>
        </div>
        <div className="divider" />
        <div className="nav-item">
          <FaShoppingCart />
          <span>Compras</span>
        </div>
        <div className="divider" />
        <div className="navbar-right" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Cerrar sesión</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
