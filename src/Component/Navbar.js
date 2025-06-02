import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
function NavBar() {
    return (
      <nav className='nav'>
        <a href='/' className='site-title'>Kanann crackers Admin Page</a>
        <ul >
          <li>
            <Link to="/" >Edit Product</Link>
          </li>
          <li>
            <Link to="/orders" >orders</Link>
          </li>
          
          
          

          
        </ul>
      </nav>
    );
  }
  export default NavBar;  