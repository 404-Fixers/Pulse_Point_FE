import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bloodHands from "../../assets/blood-hands.png";
import "./AuthPage.css";

function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === "/login";

  const [role, setRole] = useState("donor");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  }

  function validateForm() {
    if (!formData.email || !formData.password) {
      return "Please enter your email and password.";
    }

    if (!isLogin && !formData.name) {
      return "Please enter your name.";
    }

    if (!isLogin && !formData.phone) {
      return "Please enter your phone number.";
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log({
        ...formData,
        role,
      });

      navigate(role === "donor" ? "/dashboard/donor" : "/dashboard/hospital");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth">
      <div className="auth__card">
        <div className="auth__header">
          <img src={bloodHands} alt="PulsePoint" className="auth__logo" />

          <p className="auth__eyebrow">PULSEPOINT</p>

          <h1>{isLogin ? "Welcome back." : "Join PulsePoint."}</h1>

          <p>
            {isLogin
              ? "Sign in to continue to your account."
              : "Create your account and help save lives."}
          </p>
        </div>

        <div className="auth__switch">
          <button
            type="button"
            className={isLogin ? "active" : ""}
            onClick={() => {
              setError("");
              navigate("/login");
            }}
          >
            Login
          </button>

          <button
            type="button"
            className={!isLogin ? "active" : ""}
            onClick={() => {
              setError("");
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>

        {!isLogin && (
          <div className="auth__roles">
            <p>I am registering as:</p>

            <div>
              <button
                type="button"
                className={role === "donor" ? "selected" : ""}
                onClick={() => {
                  setRole("donor");
                  setError("");
                }}
              >
                Donor
              </button>

              <button
                type="button"
                className={role === "hospital" ? "selected" : ""}
                onClick={() => {
                  setRole("hospital");
                  setError("");
                }}
              >
                Hospital
              </button>
            </div>
          </div>
        )}

        <form className="auth__form" onSubmit={handleSubmit}>
          {!isLogin && (
            <label>
              {role === "hospital" ? "Hospital Name" : "Full Name"}

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={
                  role === "hospital"
                    ? "Enter hospital name"
                    : "Enter your full name"
                }
              />
            </label>
          )}

          {!isLogin && (
            <label>
              Phone Number
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="08012345678"
              />
            </label>
          )}

          <label>
            Email Address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </label>

          {!isLogin && (
            <label>
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </label>
          )}

          {error && <p className="auth__error">{error}</p>}

          <button className="auth__submit" type="submit" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="auth__footer">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setError("");
              navigate(isLogin ? "/register" : "/login");
            }}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

        <Link to="/" className="auth__home">
          ← Back to PulsePoint
        </Link>
      </div>
    </main>
  );
}

export default AuthPage;
