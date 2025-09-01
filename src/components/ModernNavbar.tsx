import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
  Globe,
  Database,
  BarChart3,
  FileText,
  Video,
  Image,
  Music,
  Sparkles,
  Zap,
  Target,
  Award,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface ModernNavbarProps {
  onThemeToggle?: () => void;
  isDark?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
  notifications?: number;
}

export default function ModernNavbar({
  onThemeToggle,
  isDark = false,
  user,
  notifications = 0,
}: ModernNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: BarChart3, href: "/" },
    { name: "Scripts", icon: FileText, href: "/scripts", active: true },
    { name: "Videos", icon: Video, href: "/videos" },
    { name: "Images", icon: Image, href: "/images" },
    { name: "Audio", icon: Music, href: "/audio" },
    { name: "Analytics", icon: Database, href: "/analytics" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                MLT AI Platform
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Professional Content Creation
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ y: -2 }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.div
              initial={false}
              animate={{ width: isSearchOpen ? 300 : 40 }}
              className="relative"
            >
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="absolute right-0 top-0"
                  >
                    <Input
                      placeholder="Search scripts, videos, images..."
                      className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20 focus:border-blue-500 focus:ring-blue-500"
                      autoFocus
                      onBlur={() => setIsSearchOpen(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-10 h-10 p-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80"
              >
                <Search className="w-4 h-4" />
              </Button>
            </motion.div>

            {/* Notifications */}
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80"
              >
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-red-500 text-white border-2 border-white dark:border-gray-900">
                    {notifications}
                  </Badge>
                )}
              </Button>
            </motion.div>

            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={onThemeToggle}
                className="w-10 h-10 p-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80"
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
            </motion.div>

            {/* User Menu */}
            {user && (
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 px-3 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                </Button>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 p-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80"
              >
                {isMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/20 dark:border-gray-800/20"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {menuItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    whileHover={{ x: 4 }}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      item.active
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
