import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <a href="/" className="footer__logo">
            ♥ PulsePoint
          </a>

          <p>Built to save time when it matters most.</p>
        </div>

        <nav className="footer__links" aria-label="Footer navigation">
          <a href="#home">Home</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#blood-drives">Blood Drives</a>
          <a href="/login">Login</a>
        </nav>
      </div>

      <div className="footer__bottom">
        <div>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Use</a>
        </div>

        <p>© PulsePoint</p>
      </div>
    </footer>
  );
}

export default Footer;
