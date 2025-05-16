import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Provider from "./views/provider/Provider";
import Brands from "./views/brands/brands";
import Celulares from "./views/products/Celulares";
import Sale from "./views/vendedor/Sale";
import Clientes from "./views/clientes/clientes";

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

export default App;
