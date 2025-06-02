import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
function Navbar({ login, setLogin }) {
  return (
    <>
      <div className="navbar">
        <div className="navbar__logo">
          <h1>Gen Img</h1>
        </div>

        <ul>
          <li>
            {login ? (
              <Link to="/signup">
                <button onClick={() => setLogin(false)}>Sign Up</button>
              </Link>
            ) : (
              <Link to="/login">
                <button onClick={() => setLogin(true)}>Login</button>
              </Link>
            )}
          </li>
        </ul>
      </div>
      <div className="line"></div>
    </>
  );
}

export default Navbar;
