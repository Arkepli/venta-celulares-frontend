  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import AdminDashboard from "./views/AdminDashboard/AdminDashboard";
  import Home from "./views/Home";
  import Tecnico from "./views/tecnico/Tecnico";
  import Cart from "./views/cart/Cart";
  import Provider from "./views/provider/Provider";
  import Brands from  './views/brands/Brands';
  import Products from "./views/products/Products";
  import Sale from "./views/vendedor/Sale";
  import ModalAgrergar from './views/brands/modalAgregar/modalAgregar';
  import ModalEditar from './views/brands/modalEditar/modalEditar';
  import ModalAgrergarPro from './views/provider/modalAgregar/modalAgregar';
  import ModalEditarPro from './views/provider/modalEditar/modalEditar';



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
