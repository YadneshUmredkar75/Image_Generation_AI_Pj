import "./App.css";
import { useContext } from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Navbar from "./component/Navebar/Navbar";
import Footer from "./component/Footer/Footer";
import Home from "./Page/Home/Home";
import GenImg from "./Page/GenImg/GenImg";
import Login from "./component/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from "./component/StorContext/StoreContext";

function App() {
  const { showLogin } = useContext(StoreContext);

  return (
    <BrowserRouter>
      <ToastContainer />
      {showLogin && <Login />}
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genimage" element={<GenImg />} />
          {/* No /login route since login is popup */}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
