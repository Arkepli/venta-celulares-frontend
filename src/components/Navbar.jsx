import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import "./Navbar.css";
import { FaUserCircle, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      {/* Sección izquierda */}
      <div className="navbar-left">
        <img
          src={logo}
          alt="Logo"
          className="logo"
          style={{ width: "95px", height: "auto" }}
        />
        <button className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>
        <li>
          <Link to="/sale">Vendedor</Link>
        </li>
        <li>
          <Link to="/adminDashboard">Admin</Link>
        </li>
        <li>
          <Link to="/tecnico">Servicio Técnico</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>

      {/* Sección derecha */}
      <div className="navbar-right">
        <div className="nav-item">
          <FaUserCircle />
          <span>Jesus Garcia</span>
        </div>

        <div className="divider"></div>

        <div className="nav-item">
          <FaShoppingCart />
          <span>Compras</span>
        </div>

        <div className="divider"></div>

        <div className="navbar-right">
          <FaSignOutAlt />
          <span>Cerrar sesión</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
