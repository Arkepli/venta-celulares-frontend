  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import Navbar from "./components/Navbar";
  import AdminDashboard from "./views/AdminDashboard/AdminDashboard";
  import Home from "./views/Home";
  import Tecnico from "./views/tecnico/Tecnico";
  import Cart from "./views/cart/Cart";
  import Provider from "./views/provider/Provider";
  import Brands from "./views/brands/brands";
  import Celulares from "./views/products/Celulares";
  import Sale from "./views/vendedor/Sale";


  function App() {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/tecnico" element={<Tecnico />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/provider" element={<Provider />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/celulares" element={<Celulares />} />
          <Route path="/vendedor" element={<Sale />} />
        </Routes>
      </>
    );
  }

  export default App;
