import { useState } from "react";
import "./AuthPage.css";
import Input from "../../components/Input/Input";
import Card from "../../components/Card/Card";

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Federal Capital Territory",
];

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const COUNTRIES = ["Nigeria"];

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

      // Clear state when country changes
      ...(name === "country" && { state: "" }),
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
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        blood_type: formData.bloodType,
        phone_number: formData.phoneNumber,
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
        phone_number: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        hospital_lisence: formData.licenseNumber,
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
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }

      // LOGIN SUCCESS
      if (mode === "login") {
        if (!data.user) {
          setError("Login successful, but user information was not returned.");
          return;
        }

        if (!data.user.role) {
          setError(
            "Login successful, but your account role was not provided by the server.",
          );
          return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);

        if (data.user.role === "donor") {
          window.location.href = "/dashboard/donor";
        } else if (data.user.role === "hospital") {
          window.location.href = "/dashboard/hospital";
        } else if (data.user.role === "admin") {
          window.location.href = "/admin-dashboard";
        } else {
          setError("Your account role is not recognized.");
        }

        return;
      }

      // REGISTRATION SUCCESS
      setSuccess(
        data.message || "Registration successful. You can now log in.",
      );

      // Clear registration form
      setFormData((previous) => ({
        ...previous,
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
      }));

      // Take user back to login after successful registration
      setMode("login");
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

        <div className="auth-tabs">
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

        {error && <p className="auth-message auth-message--error">{error}</p>}

        {success && (
          <p className="auth-message auth-message--success">{success}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* LOGIN */}
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

          {/* DONOR REGISTRATION */}
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

              <div className="form-group">
                <label htmlFor="bloodType">Blood Type</label>

                <select
                  id="bloodType"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select blood type</option>

                  {BLOOD_TYPES.map((bloodType) => (
                    <option key={bloodType} value={bloodType}>
                      {bloodType}
                    </option>
                  ))}
                </select>
              </div>

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

              <div className="form-group">
                <label htmlFor="country">Country</label>

                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select country</option>

                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>

                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={!formData.country}
                  required
                >
                  <option value="">
                    {formData.country ? "Select state" : "Select country first"}
                  </option>

                  {formData.country === "Nigeria" &&
                    NIGERIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                </select>
              </div>
            </>
          )}

          {/* HOSPITAL REGISTRATION */}
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

              <div className="form-group">
                <label htmlFor="country">Country</label>

                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select country</option>

                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>

                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={!formData.country}
                  required
                >
                  <option value="">
                    {formData.country ? "Select state" : "Select country first"}
                  </option>

                  {formData.country === "Nigeria" &&
                    NIGERIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                </select>
              </div>

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
