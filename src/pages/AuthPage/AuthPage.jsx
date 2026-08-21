import { useState } from "react";
import "./AuthPage.css";
import Input from "../../components/Input/Input";
import Card from "../../components/Card/Card";

function AuthPage() {
  const [mode, setMode] = useState("login");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    hospitalName: "",
    email: "",
    password: "",
    bloodType: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    licenseNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    let endpoint = "";
    let requestBody = {};

    if (mode === "donor") {
      endpoint = `${import.meta.env.VITE_API_URL}/auth/register/donor`;

      requestBody = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        bloodType: formData.bloodType,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
      };
    }

    if (mode === "hospital") {
      endpoint = `${import.meta.env.VITE_API_URL}/auth/register/hospital`;

      requestBody = {
        hospitalName: formData.hospitalName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        licenseNumber: formData.licenseNumber,
      };
    }

    if (mode === "login") {
      endpoint = `${import.meta.env.VITE_API_URL}/auth/login`;

      requestBody = {
        email: formData.email,
        password: formData.password,
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          setError(data.message || "Please fill in all required fields.");
        } else if (response.status === 401) {
          setError(data.message || "Invalid email or password.");
        } else if (response.status === 403) {
          setError(
            data.message ||
              "You do not have permission to complete this request.",
          );
        } else if (response.status === 404) {
          setError(data.message || "User not found.");
        } else if (response.status === 409) {
          setError(data.message || "Email already exists.");
        } else {
          setError(data.message || "Something went wrong. Please try again.");
        }

        return;
      }

      if (mode === "login") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);

        setSuccess(data.message || "Login successful.");

        if (data.user.role === "donor") {
          window.location.href = "/donor-dashboard";
        } else if (data.user.role === "hospital") {
          window.location.href = "/hospital-dashboard";
        } else if (data.user.role === "admin") {
          window.location.href = "/admin-dashboard";
        }
      } else {
        setSuccess(
          data.message || "Registration successful. You can now log in.",
        );
      }
    } catch (error) {
      console.error("Authentication error:", error);

      setError(
        "Unable to connect to the server. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Card>
        <h1>PulsePoint</h1>

        <div>
          <button type="button" onClick={() => handleModeChange("login")}>
            Login
          </button>

          <button type="button" onClick={() => handleModeChange("donor")}>
            Donor Registration
          </button>

          <button type="button" onClick={() => handleModeChange("hospital")}>
            Hospital Registration
          </button>
        </div>

        {error && <p>{error}</p>}
        {success && <p>{success}</p>}

        <form onSubmit={handleSubmit}>
          {mode === "login" && (
            <>
              <h2>Login</h2>

              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </>
          )}

          {mode === "donor" && (
            <>
              <h2>Donor Registration</h2>

              <Input
                label="Full Name"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />

              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />

              <Input
                label="Blood Type"
                name="bloodType"
                placeholder="e.g. O+"
                value={formData.bloodType}
                onChange={handleChange}
              />

              <Input
                label="Phone Number"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />

              <Input
                label="Address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
              />

              <Input
                label="City"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
              />

              <Input
                label="State"
                name="state"
                placeholder="Enter your state"
                value={formData.state}
                onChange={handleChange}
              />

              <Input
                label="Country"
                name="country"
                placeholder="Enter your country"
                value={formData.country}
                onChange={handleChange}
              />
            </>
          )}

          {mode === "hospital" && (
            <>
              <h2>Hospital Registration</h2>

              <Input
                label="Hospital Name"
                name="hospitalName"
                placeholder="Enter hospital name"
                value={formData.hospitalName}
                onChange={handleChange}
              />

              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Enter hospital email"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />

              <Input
                label="Phone Number"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />

              <Input
                label="Address"
                name="address"
                placeholder="Enter hospital address"
                value={formData.address}
                onChange={handleChange}
              />

              <Input
                label="City"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
              />

              <Input
                label="State"
                name="state"
                placeholder="Enter state"
                value={formData.state}
                onChange={handleChange}
              />

              <Input
                label="Country"
                name="country"
                placeholder="Enter country"
                value={formData.country}
                onChange={handleChange}
              />

              <Input
                label="License Number"
                name="licenseNumber"
                placeholder="Enter hospital license number"
                value={formData.licenseNumber}
                onChange={handleChange}
              />
            </>
          )}

          <button type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : "Register"}
          </button>
        </form>
      </Card>
    </div>
  );
}

export default AuthPage;
