
 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Provider from "./views/provider/Provider";
import Brands from "./views/brands/brands";
import Celulares from "./views/products/Celulares";
import Sale from "./views/vendedor/Sale";
import Clientes from "./views/clientes/clientes";
  import ModalAgrergar from './views/brands/modalAgregar/modalAgregar';
  import ModalEditar from './views/brands/modalEditar/modalEditar';
  import ModalAgrergarPro from './views/provider/modalAgregar/modalAgregar';
  import ModalEditarPro from './views/provider/modalEditar/modalEditar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/provider" element={<Provider />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/celulares" element={<Celulares />} />
        <Route path="/vendedor" element={<Sale />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </>
  );
}

  function App() {
    return (
      <>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/tecnico" element={<Tecnico />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/provider" element={<Provider />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/products" element={<Products />} />
          <Route path="/vendedor" element={<Sale />} />
          <Route path="/agregar_marca" element= {<ModalAgrergar/>}/>
          <Route path="/modal_editar" element= {<ModalEditar/>}/>
          <Route path="/agregar_proveedor" element= {<ModalAgrergarPro/>}/>
          <Route path="/editar_proveedor" element= {<ModalEditarPro/>}/>
        </Routes>
      </>
    );
  }

  export default App;
