
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Celulares from "./views/products/Celulares";
import Proveedores from "./views/proveedores/Proveedores";
import Brands from "./views/brands/brands";;
import Sale from "./views/vendedor/Sale";
import Accesorios from "./views/accesorios/Accesorios";
import MantenimientoTecnico from "./views/MantenimientoTecnico/MantenimientoTecnico";


  function App() {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/celulares" element={<Celulares />} />
          <Route path="/ventas" element={<Sale />} />
          <Route path="/accesorios" element={<Accesorios />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/mantenimiento-tecnico" element={<MantenimientoTecnico />} />
        </Routes>
      </>
    );
  }

  export default App;
