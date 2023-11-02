import logo from "../assets/images/LOGO2.png";

const Logo = () => {
    const logoStyle = {
        width: "100px", // Adjust the width as needed
        height: "auto", // This ensures the aspect ratio is maintained
        
        top: "10px", // Adjust the top position as needed
        left: "10px", // Adjust the left position as needed
      };
  return (
    <img
      src={logo}
      onClick={() => {
        window.location.href = "/";
      }}
      alt="Amazawn"
      className="logo"
      style={logoStyle}
    />
  );
};

export default Logo;