import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
/*import Login from './views/Login';
import Register from './views/Register';
import Cart from './views/Cart';*/
import AdminDashboard from './views/AdminDashboard/AdminDashboard';
import Tecnico from './views/tecnico/Tecnico'
import Cart from './views/cart/Cart';

function App() {
  return (
    <Routes>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/tecnico" element={<Tecnico />} />
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </Routes>
  );
}

export default App;
