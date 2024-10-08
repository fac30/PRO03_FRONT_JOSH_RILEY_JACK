import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo">
      <img
        data-test="logo-image"
        className="logo-image"
        src="src/assets/globe1.png"
        alt="Logo"
      />
      <h1 data-test="logo-text" className="logo-text">
        Map Tap Revenge
      </h1>
    </div>
  );
};

export default Logo;
