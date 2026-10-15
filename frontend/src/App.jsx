import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";
import LandingPage from "./pages/Landing";
import FacilityForm from "./pages/auth/FacultyRegister";
import DonorRegister from "./pages/auth/DonorRegister";
import DonorDashboard from "./pages/donor/DonorDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/layouts/DashboardLayout";
import DonorProfile from "./pages/donor/DonorProfile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminFacilities from "./pages/admin/AdminFacilities";
import HospitalDashboard from "./pages/hospital/HospitalDashboard";
import BloodCamps from "./pages/bloodlab/BloodCamps";
import BloodlabDashboard from "./pages/bloodlab/BloodlabDashboard";
import BloodStock from "./pages/bloodlab/BloodStock";
import LabProfile from "./pages/bloodlab/LabProfile";
import GetAllFacilities from "./pages/admin/GetAllFacilities";
import GetAllDonors from "./pages/admin/GetAllDonors";
import DonorCampsList from "./pages/donor/DonorCampsList";
import LabManageRequests from "./pages/bloodlab/LabManageRequests";
import HospitalRequestBlood from "./pages/hospital/HospitalRequestBlood";
import HospitalRequestHistory from "./pages/hospital/HospitalRequestHistory";
import HospitalBloodStock from "./pages/hospital/HospitalBloodStock";
import BloodLabDonor from "./pages/bloodlab/BloodLabDonor";
import DonorDirectory from "./pages/hospital/DonorDirectory";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import DonorDonationHistory from "./pages/donor/DonorDonationHistory";
import PublicInfoPage from "./pages/PublicInfoPage";
import AdminInfoPage from "./pages/admin/AdminInfoPage";

function RouteScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!hash) {
        window.scrollTo({ top: 0, left: 0 });
        return;
      }

      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      target?.scrollIntoView({ block: "start" });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <>
      <RouteScrollManager />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register/donor" element={<DonorRegister />} />
        <Route path="/register/facility" element={<FacilityForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<PublicInfoPage title="News & Updates" message="No news updates have been published yet. Please check back later or contact us if you need current information." />} />
        <Route path="/privacy" element={<PublicInfoPage title="Privacy Policy" message="Privacy policy details have not been provided in this version of the project. Please contact the administrator before sharing personal information." />} />
        <Route path="/terms" element={<PublicInfoPage title="Terms of Service" message="Terms of service have not been provided in this version of the project. Please contact the administrator if you need them before using the service." />} />
        <Route path="/cookies" element={<PublicInfoPage title="Cookie Policy" message="Cookie policy details have not been provided in this version of the project. Please contact the administrator for current information." />} />

        {/* Compatibility routes for links already used by the site */}
        <Route path="/auth" element={<Navigate to="/register/donor" replace />} />
        <Route path="/user" element={<Navigate to="/donor" replace />} />
        <Route path="/mission" element={<Navigate to="/about#mission" replace />} />
        <Route path="/stories" element={<Navigate to="/about#impact" replace />} />
        <Route path="/eligibility" element={<Navigate to="/#eligibility" replace />} />
        <Route path="/process" element={<Navigate to="/#process" replace />} />
        <Route path="/benefits" element={<Navigate to="/#benefits" replace />} />
        <Route path="/request-blood" element={<Navigate to="/hospital/blood-request-create" replace />} />
        <Route path="/inventory" element={<Navigate to="/hospital/inventory" replace />} />
        <Route path="/emergency" element={<Navigate to="/contact" replace />} />
        <Route path="/chatbot" element={<Navigate to="/#chatbot" replace />} />

        <Route path="/donor" element={<ProtectedRoute><DashboardLayout userRole="donor" /></ProtectedRoute>}>
          <Route index element={<DonorDashboard />} />
          <Route path="profile" element={<DonorProfile />} />
          <Route path="camps" element={<DonorCampsList />} />
          <Route path="history" element={<DonorDonationHistory />} />
        </Route>
      
        <Route path="/hospital" element={<ProtectedRoute><DashboardLayout userRole="hospital" /></ProtectedRoute>}>
          <Route index element={<HospitalDashboard />} />
          <Route path="blood-request-create" element={<HospitalRequestBlood />} />
          <Route path="blood-request-history" element={<HospitalRequestHistory />} />
          <Route path="inventory" element={<HospitalBloodStock />} />
          <Route path="donors" element={<DonorDirectory />} />
       </Route>
      
        <Route path="/lab" element={<ProtectedRoute><DashboardLayout userRole="blood-lab" /></ProtectedRoute>}>
          <Route index element={<BloodlabDashboard />} />
          <Route path="inventory" element={<BloodStock />} />
          <Route path="camps" element={<BloodCamps />} />
          <Route path="profile" element={<LabProfile />} />
          <Route path="requests" element={<LabManageRequests />} />
          <Route path="donor" element={<BloodLabDonor />} />
        </Route>
        
        <Route path="/admin" element={<ProtectedRoute><DashboardLayout userRole="admin" /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="verification" element={<AdminFacilities />} />
          <Route path="donors" element={<GetAllDonors />} />
          <Route path="facilities" element={<GetAllFacilities />} />
          <Route path="donations" element={<AdminInfoPage title="Donation History" message="The admin-wide donation history page is not available in this version yet." />} />
          <Route path="camps" element={<AdminInfoPage title="Blood Camps" message="Admin camp management is not available in this version yet." />} />
        </Route>

        <Route path="*" element={<PublicInfoPage title="Page not found" message="This link does not point to an available page. Use the navigation above to continue." />} />
      </Routes>
    </>
  );
}

export default App;
