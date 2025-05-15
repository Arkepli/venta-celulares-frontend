import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
/*import Login from './views/Login';
import Register from './views/Register';
import Cart from './views/Cart';*/
import AdminDashboard from "./views/adminDashboard/AdminDashboard";
import Tecnico from "./views/tecnico/Tecnico";
import Cart from "./views/cart/Cart";
import Sale from "./views/vendedor/Sale";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/tecnico" element={<Tecnico />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/sale" element={<Sale />} />
    </Routes>
  );
}

export default App;
