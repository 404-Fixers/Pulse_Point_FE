import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <a href="/" className="navbar__logo">
        ♥ PulsePoint
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
