import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
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
    { name: "Trang chủ", href: "/", current: location.pathname === "/" },
    { name: "Dashboard", href: "/dashboard", current: location.pathname === "/dashboard" },
  ];

  const services = [
    { name: "Tạo Video AI", href: "/tao-video", icon: "🎬" },
    { name: "Quản Lý Kịch Bản", href: "/quan-ly-kich-ban", icon: "✍️" },
    { name: "Quản Lý Dự Án", href: "/quan-ly-du-an", icon: "📋" },
    { name: "Analytics", href: "/analytics", icon: "📊" },
  ];

  const handleMobileMenuClose = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center space-x-3 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                MLT Script AI
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Professional AI Platform
              </div>
            </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href}>
                <motion.div
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                    item.current
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Dịch vụ
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute top-full mt-2 left-0 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 p-2 backdrop-blur-xl"
                  >
                    {services.map((service) => (
                      <Link key={service.name} to={service.href} onClick={() => setIsServicesOpen(false)}>
                        <motion.div
                          className="flex items-center w-full px-4 py-3 text-left rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group cursor-pointer"
                          whileHover={{ x: 4 }}
                        >
                          <span className="text-xl mr-3 group-hover:scale-110 transition-transform duration-200">
                            {service.icon}
                          </span>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {service.name}
                          </span>
                        </motion.div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* CTA Button */}
            <div className="hidden sm:block">
              <Link to="/tao-video">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Tạo Video AI
                </Button>
              </Link>
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-5 h-5" />
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 p-2 backdrop-blur-xl"
                  >
                    <Link
                      to="/cai-dat"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Cài đặt
                    </Link>
                    <Link
                      to="/tro-giup"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Trợ giúp
                    </Link>
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <button className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors duration-200">
                      <LogOut className="w-4 h-4 mr-3" />
                      Đăng xuất
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-700/20"
          >
            <div className="px-4 py-6 space-y-2">
              {navigation.map((item) => (
                <Link key={item.name} to={item.href} onClick={handleMobileMenuClose}>
                  <motion.div
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 cursor-pointer ${
                      item.current
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
              
              <div className="pt-2 pb-2">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-2">
                  Dịch vụ
                </div>
                {services.map((service) => (
                  <Link key={service.name} to={service.href} onClick={handleMobileMenuClose}>
                    <motion.div
                      className="flex items-center w-full px-4 py-3 text-left rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-lg mr-3">{service.icon}</span>
                      <span className="text-base font-medium">{service.name}</span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}