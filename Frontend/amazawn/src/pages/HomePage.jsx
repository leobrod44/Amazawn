import { Link } from "react-router-dom";
import Logo from "../components/Logo";
const HomePage= ()=>{
return(
    <div className="container page">
        <nav>
            <Logo></Logo>
        </nav>
    <div className="info">
      <h2>
        Amazawn <span>Delivery</span> Services
      </h2>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      
        <Link to="/RequestDelivery" className="btn">
          Request a Delivery
        </Link>
        
   
    </div>
  </div>
);
};

export default HomePage;