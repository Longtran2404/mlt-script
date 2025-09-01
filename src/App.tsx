import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import MainLayout from "./components/layout/MainLayout";
import NewHome from "./pages/NewHome";
import ServiceCardDemo from "./components/ServiceCardDemo";
import "./App.css";

// Import các trang chính
import EnhancedDashboard from "./pages/EnhancedDashboard";
import ScriptManager from "./pages/ScriptManager";
import TaoVideo from "./pages/TaoVideo";
import ProjectManagement from "./pages/ProjectManagement";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import OAuth2Callback from "./pages/OAuth2Callback";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Trang chủ không có sidebar */}
            <Route path="/" element={<NewHome />} />
            
            {/* Các trang có sidebar */}
            <Route path="/dashboard" element={
              <MainLayout showSidebar={true}>
                <div className="container mx-auto px-4 py-8">
                  <EnhancedDashboard />
                </div>
              </MainLayout>
            } />
            
            <Route path="/tao-video" element={
              <MainLayout showSidebar={true}>
                <div className="container mx-auto px-4 py-8">
                  <TaoVideo />
                </div>
              </MainLayout>
            } />
            
            <Route path="/quan-ly-kich-ban" element={
              <MainLayout showSidebar={true}>
                <div className="container mx-auto px-4 py-8">
                  <ScriptManager />
                </div>
              </MainLayout>
            } />
            
            <Route path="/quan-ly-du-an" element={
              <MainLayout showSidebar={true}>
                <div className="container mx-auto px-4 py-8">
                  <ProjectManagement />
                </div>
              </MainLayout>
            } />
            
            <Route path="/analytics" element={
              <MainLayout showSidebar={true}>
                <div className="container mx-auto px-4 py-8">
                  <Analytics />
                </div>
              </MainLayout>
            } />
            
            <Route path="/cai-dat" element={
              <MainLayout showSidebar={true}>
                <div className="container mx-auto px-4 py-8">
                  <Settings />
                </div>
              </MainLayout>
            } />
            
            <Route path="/tro-giup" element={
              <MainLayout showSidebar={true}>
                <div className="container mx-auto px-4 py-8">
                  <Help />
                </div>
              </MainLayout>
            } />
            
            {/* Special routes */}
            <Route path="/oauth2/callback" element={<OAuth2Callback />} />
            <Route path="/service-demo" element={
              <MainLayout showSidebar={true}>
                <div className="container mx-auto px-4 py-8">
                  <ServiceCardDemo />
                </div>
              </MainLayout>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
