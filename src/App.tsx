import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import MainLayout from "./components/layout/MainLayout";
import NewHome from "./pages/NewHome";
import ServiceCardDemo from "./components/ServiceCardDemo";
import "./App.css";

// Import các trang chính
import EnhancedDashboard from "./pages/EnhancedDashboard";
import ScriptManager from "./pages/ScriptManager";
import TaoVideo from "./pages/TaoVideo";
import QuanLy from "./pages/QuanLy";
import ProjectManagement from "./pages/ProjectManagement";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import OAuth2Callback from "./pages/OAuth2Callback";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "service-demo":
        return <ServiceCardDemo />;
      case "oauth2-callback":
        return <OAuth2Callback onPageChange={setCurrentPage} />;
      case "dashboard":
        return (
          <div className="container mx-auto px-4 py-8">
            <EnhancedDashboard />
          </div>
        );
      case "tao-video":
        return (
          <div className="container mx-auto px-4 py-8">
            <TaoVideo />
          </div>
        );
      case "tao-kich-ban":
      case "script-manager":
        return (
          <div className="container mx-auto px-4 py-8">
            <ScriptManager />
          </div>
        );
      case "quan-ly":
        return (
          <div className="container mx-auto px-4 py-8">
            <QuanLy />
          </div>
        );
      case "project-management":
        return (
          <div className="container mx-auto px-4 py-8">
            <ProjectManagement />
          </div>
        );
      case "analytics":
        return (
          <div className="container mx-auto px-4 py-8">
            <Analytics />
          </div>
        );
      case "settings":
        return (
          <div className="container mx-auto px-4 py-8">
            <Settings />
          </div>
        );
      case "help":
        return (
          <div className="container mx-auto px-4 py-8">
            <Help />
          </div>
        );
      default:
        return <NewHome onPageChange={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="App">
        <MainLayout
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          showSidebar={true}
        >
          {renderPage()}
        </MainLayout>
      </div>
    </ThemeProvider>
  );
}

export default App;
