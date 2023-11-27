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
          <FontAwesomeIcon icon={faBars} /> 
      </button>

      {isOpen && (
      <div className={`sidebar ${isOpen ? 'open' : ''}`} >
         <button className="close-button"
         style={{background:"transparent", color:"#016846"}}
        
         onClick={toggleSidebar}
       >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        <nav>
          <ul>
          <li className='firstli' style={{height:"10px"}}>
          
          </li>
            <li >
              <Link to="/requestdelivery" className='link' >
                Shipping
              </Link>
            </li>
            <li >
              <Link to="/tracking" className='link'> 
              Tracking
              </Link>
            </li>

      
            <li>
            <Link to="/review" className='link' >
                Review
              </Link>
              </li>     
            <li className='lastli'>
            <Link to="/customersupport" className='link'> 

              Support
            </Link>
            </li>
            
          </ul>
        </nav>
        
      </div>
      )}
    </div>
  );
};

export default Navbar;