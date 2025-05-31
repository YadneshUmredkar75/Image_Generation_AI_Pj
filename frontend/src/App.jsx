import './App.css';
import { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './component/Navebar/Navbar'; 
import Footer from './component/Footer/Footer';
import Home from './Page/Home/Home'; 
import GenImg from './Page/GenImg/GenImg';
function App() {
  const [login, setLogin] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar login={login} setLogin={setLogin} />
        <Routes>
          <Route path="/" element={<Home setLogin={setLogin} login={login} />} />
           <Route path="/genimage" element={<GenImg />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;