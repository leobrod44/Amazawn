import '../styling/Navbar.css'
import React, { useState } from "react";
import { faBars,faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesome library
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="navbar">
      <button className="hamburger-menu" onClick={toggleSidebar}>
      {isOpen ? (
          <FontAwesomeIcon icon={faTimes} /> // Display the "x" icon when the sidebar is open
        ) : (
          <FontAwesomeIcon icon={faBars} /> // Display the hamburger menu icon when the sidebar is closed
        )}
    
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`} >
        <nav>
          <ul>
            <li >
              <Link to="/requestdelivery" className='link' >
                Shipping
              </Link>
            </li>
            <li >
              <Link to="/" className='link'> 
              Tracking
              </Link>
            </li>
              
            <li className='lastli'>
            <Link to="/" className='link'> 
              Support
            </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;