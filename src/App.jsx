  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import Navbar from "./components/Navbar";
  import Home from "./views/Home";
  import Provider from "./views/provider/Provider";
  import Brands from "./views/brands/brands";
  import Celulares from "./views/products/Celulares";
  import Sale from "./views/vendedor/Sale";
  import Clientes from "./views/clientes/Clientes";
  import Categorias from "./views/categorias/Categorias";

  function App() {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/provider" element={<Provider />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/celulares" element={<Celulares />} />
          <Route path="/ventas" element={<Sale />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/categorias" element={<Categorias />} />
        </Routes>
      </>
    );
  }

  export default App;
