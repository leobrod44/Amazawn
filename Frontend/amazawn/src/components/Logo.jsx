import logo from "../assets/images/LOGO2.png";

const Logo = () => {
  const logoStyle = {
    width: "100px",
    height: "auto",
    top: "10px",
    left: "10px",
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
