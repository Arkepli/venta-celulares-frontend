import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import Tecnico from './pages/Tecnico';
import Cart from './pages/Cart';
import Provider from './views/provider/Provider';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/tecnico" element={<Tecnico />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/provider' element= {<Provider/>} />
      </Routes>
    </Router>
  );
}

export default App;
