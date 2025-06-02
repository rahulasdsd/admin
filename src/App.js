import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './Pages/Admin';
import Footer from './Component/Footer';
import AddProduct from './Pages/AddProduct';
import Home from './Pages/Home';
import NavBar from './Component/Navbar';


function App() {
  

  return (
    <Router>
      <NavBar/>
    <div>
      <Routes>
        <Route path="/" element={<AddProduct/>} />
         
          
          
          <Route path="/orders" element={<Admin/>} />
        </Routes>
    </div>
    <Footer/>
    </Router>
  );
}

export default App;

