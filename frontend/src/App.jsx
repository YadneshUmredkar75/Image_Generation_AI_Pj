import "./App.css";
import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./component/Navebar/Navbar";
import Footer from "./component/Footer/Footer";
import Home from "./Page/Home/Home";
import GenImg from "./Page/GenImg/GenImg";
import Login from "./Page/Login/Login";
import Signup from "./Page/signup/Signup";

/*
  Fix the import casing to match the actual file path.
  Change:
  To:
*/
function App() {
  const [login, setLogin] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar login={login} setLogin={setLogin} />
        <Routes>
          {login ? (
            <Route path="/login" element={<Login />} />
          ) : (
            <Route path="/signup" element={<Signup />} />
          )}
          <Route
            path="/"
            element={<Home setLogin={setLogin} login={login} />}
          />
          <Route path="/genimage" element={<GenImg />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
