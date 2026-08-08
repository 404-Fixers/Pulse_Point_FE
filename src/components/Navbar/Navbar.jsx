import "./Navbar.css";
import bloodHands from "../../assets/blood-hands.png";

function Navbar() {
  return (
    <header className="navbar">
      <a href="/" className="navbar__logo">
        <img src={bloodHands} alt="PulsePoint Logo" />
        <span>PulsePoint</span>
      </a>

      <nav className="navbar__links">
        <a href="#home">Home</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#blood-drives">Blood Drives</a>
        <a href="/login">Login</a>

        <a href="/register" className="navbar__button">
          Donate Blood
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
