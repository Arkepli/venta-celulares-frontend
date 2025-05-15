import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import Tecnico from "./pages/Tecnico";
import Cart from "./pages/Cart";
import Provider from "./views/provider/Provider";
import Brands from "./views/brands/brands";
import Products from "./views/products/Products";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/tecnico" element={<Tecnico />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/provider" element={<Provider />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
