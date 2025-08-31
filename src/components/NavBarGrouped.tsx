import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, User, Settings, LogOut } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface NavBarGroupedProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

export default function NavBarGrouped({
  onPageChange,
  currentPage,
}: NavBarGroupedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Trang chủ", href: "home", current: currentPage === "home" },
    {
      name: "Dashboard",
      href: "dashboard",
      current: currentPage === "dashboard",
    },
    {
      name: "Tạo Video",
      href: "tao-video",
      current: currentPage === "tao-video",
    },
    {
      name: "Tạo Kịch bản",
      href: "tao-kich-ban",
      current: currentPage === "tao-kich-ban",
    },
    { name: "Quản lý", href: "quan-ly", current: currentPage === "quan-ly" },
    {
      name: "Quản lý dự án",
      href: "project-management",
      current: currentPage === "project-management",
    },
    {
      name: "Analytics",
      href: "analytics",
      current: currentPage === "analytics",
    },
    {
      name: "Anime.js Demo",
      href: "animejs-demo",
      current: currentPage === "animejs-demo",
    },
    {
      name: "Cài đặt",
      href: "settings",
      current: currentPage === "settings",
    },
  ];

  const handleNavigation = (page: string) => {
    onPageChange(page);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <motion.div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleNavigation("home")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
                MLT Script AI
              </span>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    item.current
                      ? "bg-red-600 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-red-600/10 hover:text-red-600 dark:hover:text-red-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right side - Theme toggle, Profile, Mobile menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            {/* Profile Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <User className="w-5 h-5" />
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50"
                  >
                    <button
                      onClick={() => {
                        handleNavigation("settings");
                        setIsProfileOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Cài đặt
                    </button>
                    <button
                      onClick={() => {
                        handleNavigation("analytics");
                        setIsProfileOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Analytics
                    </button>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <LogOut className="w-4 h-4 mr-2" />
                      Đăng xuất
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    item.current
                      ? "bg-red-600 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-red-600/10 hover:text-red-600 dark:hover:text-red-400"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
