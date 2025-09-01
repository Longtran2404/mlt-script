import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewHome from "./pages/NewHome";
import ScriptManager from "./pages/ScriptManager";
import ScriptCreatorNew from "./pages/ScriptCreatorNew";
import TaoVideoNew from "./pages/TaoVideoNew";
import EnhancedDashboardNew from "./pages/EnhancedDashboardNew";
import ProjectManagementNew from "./pages/ProjectManagementNew";
import AnalyticsNew from "./pages/AnalyticsNew";
import QuanLyNew from "./pages/QuanLyNew";
import ModernNavbar from "./components/ModernNavbar";
import ModernSidebar from "./components/ModernSidebar";
import ModernDashboard from "./components/ModernDashboard";
import OAuth2Callback from "./pages/OAuth2Callback";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<NewHome />} />
          <Route path="/home" element={<NewHome />} />
          <Route path="/dashboard" element={<EnhancedDashboardNew />} />
          <Route path="/script-manager" element={<ScriptManager />} />
          <Route path="/script-creator" element={<ScriptCreatorNew />} />
          <Route path="/tao-video" element={<TaoVideoNew />} />
          <Route path="/quan-ly" element={<QuanLyNew />} />
          <Route path="/quan-ly-du-an" element={<ProjectManagementNew />} />
          <Route path="/analytics" element={<AnalyticsNew />} />
          <Route path="/modern-dashboard" element={<ModernDashboard />} />
          <Route path="/oauth2callback" element={<OAuth2Callback />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
