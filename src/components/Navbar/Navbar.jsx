import "./Navbar.css";

function Navbar() {
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    window.location.href = "/";
  };

  return (
    <header className="navbar">
      <a href="/" className="navbar__logo">
        ♥️ PulsePoint
      </a>

      <nav className="navbar__links">
        <a href="#home">Home</a>

        <a href="#how-it-works">How It Works</a>

        <a href="#blood-drives">Blood Drives</a>

        {!isLoggedIn && <a href="/login">Login</a>}

        {!isLoggedIn && (
          <a href="/register" className="navbar__button">
            Donate Blood
          </a>
        )}

        {isLoggedIn && (
          <button
            type="button"
            onClick={handleLogout}
            className="navbar__button"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
