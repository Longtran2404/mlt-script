import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Video,
  FileText,
  BarChart3,
  FolderOpen,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigation = [
    {
      name: "Trang chủ",
      href: "/",
      icon: <Home className="w-5 h-5" />,
      current: location.pathname === "/",
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <BarChart3 className="w-5 h-5" />,
      current: location.pathname === "/dashboard",
    },
    {
      name: "Tạo Video AI",
      href: "/tao-video",
      icon: <Video className="w-5 h-5" />,
      current: location.pathname === "/tao-video",
      highlight: true,
    },
    {
      name: "Quản Lý Kịch Bản",
      href: "/quan-ly-kich-ban",
      icon: <FileText className="w-5 h-5" />,
      current: location.pathname === "/quan-ly-kich-ban",
      highlight: true,
    },
    {
      name: "Quản Lý Dự Án",
      href: "/quan-ly-du-an",
      icon: <FolderOpen className="w-5 h-5" />,
      current: location.pathname === "/quan-ly-du-an",
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      current: location.pathname === "/analytics",
    },
    {
      name: "Cài đặt",
      href: "/cai-dat",
      icon: <Settings className="w-5 h-5" />,
      current: location.pathname === "/cai-dat",
    },
    {
      name: "Trợ giúp",
      href: "/tro-giup",
      icon: <HelpCircle className="w-5 h-5" />,
      current: location.pathname === "/tro-giup",
    },
  ];

  return (
    <motion.aside
      initial={{ width: isCollapsed ? 80 : 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-20 h-[calc(100vh-80px)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/20 dark:border-gray-700/20 z-40 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="p-4 border-b border-gray-200/20 dark:border-gray-700/20">
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item, index) => (
            <Link key={item.name} to={item.href}>
              <motion.div
                className={`w-full flex items-center px-3 py-3 rounded-xl text-left transition-all duration-200 group cursor-pointer ${
                  item.current
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : item.highlight
                    ? "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                whileHover={{ x: isCollapsed ? 0 : 4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
              <div className="flex items-center justify-center min-w-[20px]">
                {item.icon}
              </div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3 flex items-center justify-between flex-1"
                  >
                    <span className="text-sm font-medium">{item.name}</span>
                    {item.highlight && !item.current && (
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="p-4 border-t border-gray-200/20 dark:border-gray-700/20"
            >
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">ML</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    MLT User
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Pro Plan
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}