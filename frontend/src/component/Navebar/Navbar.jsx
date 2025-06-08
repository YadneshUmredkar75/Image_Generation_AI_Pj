import React, { useContext } from "react";
import "./Navbar.css";
import { StoreContext } from "../StorContext/StoreContext";

function Navbar() {
  const { setShowLogin, token, setToken } = useContext(StoreContext);

  const handleLogout = () => {
    setToken(null); 
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar__logo">
          <h1>Gen Img</h1>
        </div>

        <ul>
          {!token ? (
            <>
              <li>
                <button onClick={() => setShowLogin(true)}>Login</button>
              </li>
              <li>
                <button onClick={() => setShowLogin(true)}>Sign Up</button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
      <div className="line"></div>
    </>
  );
}

export default Navbar;
