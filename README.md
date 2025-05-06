# Frontend - Venta de Celulares 📱

Este proyecto es una aplicación web desarrollada con **ReactJS** para la gestión completa de un negocio de **venta de celulares**. Está conectada a un backend que expone rutas RESTful para interactuar con una base de datos NoSQL.

---

## 🎯 Objetivo del proyecto

Permitir a los empleados o administradores de una tienda de celulares:
- Agregar y consultar productos
- Registrar ventas
- Administrar clientes, marcas, proveedores y categorías
- Visualizar y modificar información de forma rápida y fácil

---

## 🧭 Vistas principales del frontend

Cada una de estas vistas se conecta a una de las rutas del backend:

### 📦 Inventario de Celulares
Consume la ruta: `/celulares`
- Lista de celulares disponibles
- Agregar, editar o eliminar un celular
- Filtros por marca y categoría

### 💰 Ventas
Consume la ruta: `/ventas`
- Registrar una venta nueva
- Ver historial de ventas
- Detalles de cada venta (cliente, celular, fecha)

### 👥 Clientes
Consume la ruta: `/clientes`
- Ver todos los clientes registrados
- Agregar cliente nuevo desde una venta
- Editar o eliminar clientes existentes

### 🏷️ Marcas
Consume la ruta: `/marcas`
- Lista de marcas disponibles
- Añadir o eliminar marcas que aparecen en el formulario de celulares

### 🚚 Proveedores
Consume la ruta: `/proveedores`
- Gestión de proveedores
- Vista para agregar nuevos proveedores
- Asignación de proveedor al ingresar stock nuevo

### 📂 Categorías
Consume la ruta: `/categorias`
- Lista de categorías como "Gama alta", "Gama media", etc.
- Selección desde el formulario de celulares
- Gestión sencilla de nuevas categorías

---

## 🔗 Conexión al backend

Todas las vistas están conectadas al backend a través de llamadas HTTP (`fetch`, `axios`, etc.), lo que permite realizar todas las operaciones CRUD desde la interfaz sin autenticación por ahora (modo libre de pruebas/desarrollo).

---

## 🧱 Estructura de carpetas

**/src**
**/pages**
CelularesPage.jsx
VentasPage.jsx
ClientesPage.jsx
MarcasPage.jsx
ProveedoresPage.jsx
CategoriasPage.jsx

**/components**
CelularForm.jsx
ClienteForm.jsx
VentaForm.jsx
MarcaForm.jsx

