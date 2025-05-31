import './App.css';
import { useState } from 'react';
import Navbar from './component/Navebar/Navbar'; 
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  const [login, setLogin] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar login={login} setLogin={setLogin} />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} /> 
           
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;