import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import DonorDashboard from "./pages/DonorDashboard/DonorDashboard";
import HospitalDashboard from "./pages/HospitalDashboard/HospitalDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        {/* Donor Dashboard */}
        <Route path="/dashboard/donor" element={<DonorDashboard />} />

        {/* Hospital Dashboard */}
        <Route path="/dashboard/hospital" element={<HospitalDashboard />} />

        {/* Redirect old dashboard URLs to the correct ones */}
        <Route
          path="/donor-dashboard"
          element={<Navigate to="/dashboard/donor" replace />}
        />

        <Route
          path="/hospital-dashboard"
          element={<Navigate to="/dashboard/hospital" replace />}
        />

        {/* Unknown pages go back home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
