import React, { useContext } from "react";
import routes from "./routes";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/Landingpage";
import LoginPage from "../pages/LoginPage";
import ReceptionistDashboard from "../pages/ReceptionistDashboard";
import DoctorDashboard from "../pages/DoctorsDashboard";
import NewCasesDashboard from "../pages/NewCasesDashboard";
import PatientHealthRecordForm from "../pages/PatientHealthRecordForm";
import SupervisorDashboard from "../pages/SupervisorDashboard";
import FHWAssignmentPage from "../pages/FHWAssignmentPage";
import ForgotPassword from "../pages/ForgotPassword";
import PatientReassignmentPage from "../pages/PatientReassignPage";
import FHWAnalyticsPage from "../pages/FHWAnalyticsPage";
import FHWInfoPage from "../pages/FHWInfoPage";
import PieChart from "../component/PieChart";
import ProfilePage from "../pages/ProfilePage";
import PastPatientHealthRecords from "../pages/PastPatientsHealthRecords";
import PatientHealthRecords from "../pages/PatientHealthRecords";
import { UserContext } from "../contexts/UserContext";

const AppRouter = () => {
  const { globalLoader } = useContext(UserContext);

  return (
    <Router>
      <Routes>
        <Route path={routes.LandingPage} element={<LandingPage />} />
        <Route path={routes.LoginPage} element={<LoginPage />} />
        <Route path={routes.ForgotPassword} element={<ForgotPassword />} />

        <Route
          path={routes.ReceptionistDashboard}
          element={<ReceptionistDashboard />}
        />
        <Route path={routes.DoctorDashboard} element={<DoctorDashboard />} />
        <Route path={routes.OPD} element={<NewCasesDashboard />} />
        <Route
          path={routes.HealthRecord}
          element={<PatientHealthRecordForm />}
        />
        <Route
          path={routes.PastPatientHR}
          element={<PastPatientHealthRecords />}
        />
        <Route path={routes.PatientHR} element={<PatientHealthRecords />} />

        <Route
          path={routes.SupervisorDashboard}
          element={<SupervisorDashboard />}
        />
        <Route path={routes.AssignFWH} element={<FHWAssignmentPage />} />
        <Route
          path={routes.ReassignPatient}
          element={<PatientReassignmentPage />}
        />
        <Route path={routes.FHWAnalytics} element={<FHWAnalyticsPage />} />
        <Route path={routes.FHWInfo} element={<FHWInfoPage />} />
        <Route path={routes.ProfilePage} element={<ProfilePage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
