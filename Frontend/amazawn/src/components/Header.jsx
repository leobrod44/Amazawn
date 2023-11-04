import React from 'react';
import Logo from './Logo.jsx'
import '../styling/Header.css'; // Create a separate CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesome library
import { faTruck, faBars } from '@fortawesome/free-solid-svg-icons';
import Navbar from './NavBar.jsx';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Logo/>
      </div>
      <div className="header-right">
        <button className="green-button">
        <span className="button-text">Track</span>
          <FontAwesomeIcon icon={faTruck} /> 
        </button>
            <Navbar/>
      </div>
    </header>
  );
};

export default Header;