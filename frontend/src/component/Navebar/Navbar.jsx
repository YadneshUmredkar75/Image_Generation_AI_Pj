import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
      <div className='navbar__logo'>
        <h1>Gen Img </h1>
        </div>
      <div className='navbar__links'>
        <ul>
          <li><a href="/">Home</a></li>
          {
            <li><a href="sign up">Sgn up</a></li>
          }
          </ul>
          </div>
    </div>
  )
}

export default Navbar
