import React from 'react';  
import './Navbar.css';

function Navbar({ login, setLogin }) {


  return (
    <div className='navbar'>
      <div className='navbar__logo'>
        <h1>Gen Img</h1>
      </div>
       
        <ul>
         
          <li>
            {login ? (
              <button onClick={() => setLogin(false)}>Sign Up</button>
            ) : (
              <button onClick={() => setLogin(true)}>Login</button>
            )}
          </li>
        </ul>
      </div>
  
  )
}

export default Navbar;