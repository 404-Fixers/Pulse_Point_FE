import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import DonorDashboard from "./pages/DonorDashboard/DonorDashboard";
import HospitalDashboard from "./pages/HospitalDashboard/HospitalDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        {/* Donor Dashboard */}
        <Route path="/dashboard/donor" element={<DonorDashboard />} />

        {/* Hospital Dashboard */}
        <Route path="/dashboard/hospital" element={<HospitalDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
