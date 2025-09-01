import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "../Footer";
import ChatBot from "../ChatBot";
import StarField from "../StarField";

interface MainLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export default function MainLayout({
  children,
  showSidebar = true,
}: MainLayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <StarField />
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/50 to-purple-50/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50" />
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        {showSidebar && !isHomePage && (
          <Sidebar />
        )}

        {/* Content Area */}
        <main
          className={`flex-1 transition-all duration-300 ${
            showSidebar && !isHomePage ? "ml-20 lg:ml-[280px]" : ""
          } pt-20`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Footer - Only show on home page */}
      {isHomePage && <Footer />}

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
}