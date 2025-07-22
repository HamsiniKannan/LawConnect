import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import LawyerLogin from "./pages/LawyerLogin";
import LawyerRegister from "./pages/LawyerRegister";
import UserDashboard from "./pages/UserDashboard";
import LawyerProfile from "./pages/LawyerProfile";
import AiLawyer from "./pages/AiLawyer";
import ContactLawyer from "./pages/ContactLawyer";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* User Routes */}
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/ai-lawyer" element={<AiLawyer />} />
        <Route path="/contact-lawyer" element={<ContactLawyer />} />

        {/* Lawyer Routes */}
        <Route path="/lawyer-login" element={<LawyerLogin />} />
        <Route path="/lawyer-register" element={<LawyerRegister />} />
        <Route path="/lawyer-profile" element={<LawyerProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
